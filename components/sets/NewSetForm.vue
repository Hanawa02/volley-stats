<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <SwitchFormField name="team_starts_serving">
      <template v-slot:label>
        {{ new_set_form_team_starts_serving_label() }}
      </template>
    </SwitchFormField>

    <HalfCourt class="lg:max-w-96 h-fit">
      <template #opponent>
        <div class="text-lg text-center p-2 font-semibold text-red-900">
          {{ opponentTeamName }}
        </div>
      </template>

      <template v-for="key in Object.keys(playerInPositions)" :key="key" v-slot:[`rotation-${key}`]>
        <div
          class="w-full h-full hover:bg-orange-400/50 cursor-pointer flex flex-col items-center justify-center"
          @drop="onDrop($event, key)"
          @dragover="onDragOver"
          @click="setPlayerOnPosition(key, null)"
        >
          {{ playerInPositions[key]?.name ?? key }}
          <span v-if="playerInPositions[key]">#{{ playerInPositions[key]?.uniform_number }}</span>
        </div>
      </template>
    </HalfCourt>

    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li
        v-for="player of gamePlayers"
        :key="player.player_id"
        class="bg-slate-100 hover:bg-slate-200"
      >
        <div class="p-2" :draggable="true" @dragstart="startDrag($event, player)">
          {{ player.uniform_number }} - {{ player.name }}
        </div>
      </li>
    </ul>

    <Button type="submit" class="mt-6 sticky bottom-0">
      {{ new_set_form_submit_button() }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionContext } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { new_set_form_team_starts_serving_label, new_set_form_submit_button } from "translations";

import { useSets } from "~/composables/sets";

import InfoTooltip from "~/components/ui/InfoTooltip.vue";
import { Button } from "~/components/ui/button";
import HalfCourt from "~/components/sets/HalfCourt.vue";
import SwitchFormField from "~/components/ui/SwitchFormField.vue";

const formSchema = toTypedSchema(
  z.object({
    team_starts_serving: z.boolean(),
  })
);

const client = useSupabaseClient();
const user = useSupabaseUser();

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    team_starts_serving: true,
  },
});

const route = useRoute();
const teamId = computed(() => route.params.team_id);
const gameId = computed(() => route.params.game_id);

const { addSet } = useSets();

const parseSetFromForm = (): InsertTeam => {
  return {
    game_id: gameId.value,
    team_starts_serving: form.values.team_starts_serving,
  };
};

type GamePlayer = {
  player_id: number;
  uniform_number: number;
  name: string;
};

type GamePlayerWithGame = GamePlayer & {
  games: {
    opponent_team_name: string;
  };
};

const playerInPositions = ref<Record<number, GamePlayer | null>>({
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
});

const { data: gamePlayers } = await useAsyncData<GamePlayerWithGame[]>(
  "gamePlayers",
  async (context) => {
    if (!gameId.value) {
      return;
    }

    const { data, error } = await client
      .from("game_participating_players")
      .select("player_id, uniform_number, games(opponent_team_name), team_members(name)")
      .eq("game_id", gameId.value)
      .order("created_at");

    return (
      data?.map((item) => ({
        player_id: item.player_id,
        uniform_number: item.uniform_number,
        name: item.team_members.name,
        games: item.games,
      })) ?? []
    );
  }
);

const opponentTeamName = computed(() => gamePlayers.value[0]?.games?.opponent_team_name);

const router = useRouter();
const createSet = async () => {
  const { data } = await addSet(parseSetFromForm());

  const setId = data?.[0].id;

  if (setId) {
    router.push(`/teams/${teamId.value}/games/${gameId.value}/sets/${setId}`);
  }
};

const handleErrors = (errors: InvalidSubmissionContext) => {
  console.error("Form errors!", errors);
};

const onSubmit = form.handleSubmit(createSet, handleErrors);

const setPlayerOnPosition = (position: number, player) => {
  playerInPositions.value[position] = player;
};

const startDrag = (event: Event, player: GamePlayer) => {
  event.dataTransfer.setData("player", JSON.stringify(player));
};

const onDragOver = (event: Event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const onDrop = (event: Event, position: number) => {
  event.preventDefault();

  const id = event.dataTransfer.getData("playerId");
  const player = JSON.parse(event.dataTransfer.getData("player"));
  setPlayerOnPosition(position, player);
};
</script>
