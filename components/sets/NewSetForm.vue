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
          :class="[
            'w-full h-full cursor-pointer flex flex-col items-center justify-center',
            'hover:bg-orange-400/50',
            {
              'border-x border-dashed border-blue-600 min-h-12': ['libero-1', 'libero-2'].includes(
                key
              ),
            },
          ]"
          @drop="onDrop($event, key)"
          @dragover="onDragOver"
          @click="setPlayerOnPosition(key, null)"
        >
          <template v-if="playerInPositions[key]">
            <span
              >#{{ playerInPositions[key]?.uniform_number }} -
              {{ playerInPositions[key]?.name }}</span
            >
            <span></span>
          </template>
          <span v-else class="text-black">{{ key }}</span>
        </div>
      </template>
    </HalfCourt>

    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li
        v-for="player of gamePlayers"
        :key="player.player_id"
        :class="[
          player.positions.includes('libero')
            ? 'bg-blue-300 hover:bg-blue-400'
            : 'bg-slate-100 hover:bg-slate-200',
          'cursor-move',
        ]"
      >
        <div class="p-2" :draggable="true" @dragstart="startDrag($event, player)">
          {{ player.uniform_number }} - {{ player.name }}
        </div>
      </li>
    </ul>

    {{ disableButton }}
    <Button type="submit" class="mt-6 sticky bottom-0" :disabled="disableButton">
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
    starting_player_1: playerInPositions.value["1"]?.player_id,
    starting_player_2: playerInPositions.value["2"]?.player_id,
    starting_player_3: playerInPositions.value["3"]?.player_id,
    starting_player_4: playerInPositions.value["4"]?.player_id,
    starting_player_5: playerInPositions.value["5"]?.player_id,
    starting_player_6: playerInPositions.value["6"]?.player_id,
    starting_libero_1: playerInPositions.value["libero-1"]?.player_id,
    starting_libero_2: playerInPositions.value["libero-2"]?.player_id,
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

const playerInPositions = ref<Record<string, GamePlayer | null>>({
  "1": null,
  "2": null,
  "3": null,
  "4": null,
  "5": null,
  "6": null,
  "libero-1": null,
  "libero-2": null,
});

const { data: gamePlayers } = await useAsyncData<GamePlayerWithGame[]>(
  "gamePlayers",
  async (context) => {
    if (!gameId.value) {
      return;
    }

    const { data, error } = await client
      .from("game_participating_players")
      .select("player_id, uniform_number, games(opponent_team_name), team_members(name, positions)")
      .eq("game_id", gameId.value)
      .order("created_at");

    return (
      data?.map((item) => ({
        player_id: item.player_id,
        uniform_number: item.uniform_number,
        name: item.team_members.name,
        positions: item.team_members.positions,
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

const setPlayerOnPosition = (position: string, player) => {
  playerInPositions.value[position] = player;
};

const startDrag = (event: Event, player: GamePlayer) => {
  event.dataTransfer.setData("player", JSON.stringify(player));
};

const onDragOver = (event: Event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const onDrop = (event: Event, position: string) => {
  event.preventDefault();

  const id = event.dataTransfer.getData("playerId");
  const player = JSON.parse(event.dataTransfer.getData("player"));

  const currentPlayerPosition = Object.keys(playerInPositions.value).find(
    (key) => playerInPositions.value[key]?.player_id === player.player_id
  );

  if (currentPlayerPosition) {
    setPlayerOnPosition(currentPlayerPosition, null);
  }

  setPlayerOnPosition(position, player);
};

const disableButton = computed(() => {
  return Object.entries(playerInPositions.value).some(
    ([position, player]) => !["libero-1", "libero-2"].includes(position) && player === null
  );
});
</script>
