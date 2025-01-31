<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <InputFormField
      name="opponentTeamName"
      type="text"
      :placeholder="new_game_form_opponent_team_name_placeholder()"
    >
      <template v-slot:label>
        {{ new_game_form_opponent_team_name_label() }}
        <InfoTooltip>
          {{ new_game_form_opponent_team_name_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <DatePickerFormField name="date">
      <template v-slot:label>
        {{ new_game_form_date_label() }}
        <InfoTooltip>
          {{ new_game_form_date_description() }}
        </InfoTooltip>
      </template>
    </DatePickerFormField>

    <SwitchFormField name="isHomeGame">
      <template v-slot:label>
        {{ new_game_form_is_home_game_label() }}
      </template>
    </SwitchFormField>

    <ParticipatingPlayersList :team-id="teamId" v-model="selectedPlayers" />

    <Button type="submit" class="mt-6 sticky bottom-0">
      {{ new_game_form_submit_button() }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionContext } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { useGames, type InsertTeam, type ParticipatingPlayer } from "~/composables/games";
import { AccessType, PlayerPositions } from "~/types/database.enums.ts";

import {
  new_game_form_opponent_team_name_label,
  new_game_form_opponent_team_name_placeholder,
  new_game_form_opponent_team_name_description,
  new_game_form_date_label,
  new_game_form_date_description,
  new_game_form_is_home_game_label,
  new_game_form_is_home_game_description,
  new_game_form_submit_button,
} from "translations";

import InfoTooltip from "~/components/ui/InfoTooltip.vue";
import { Button } from "~/components/ui/button";
import InputFormField from "~/components/ui/InputFormField.vue";
import DatePickerFormField from "~/components/ui/DatePickerFormField.vue";
import SwitchFormField from "~/components/ui/SwitchFormField.vue";
import ParticipatingPlayersList from "~/components/games/ParticipatingPlayersList.vue";

const formSchema = toTypedSchema(
  z.object({
    date: z.date(),
    isHomeGame: z.boolean(),
    opponentTeamName: z.string().min(2).max(255),
  })
);

const user = useSupabaseUser();

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    date: new Date(),
    isHomeGame: false,
    opponentTeamName: "",
  },
});
const route = useRoute();
const teamId = computed(() => route.params.team_id);
const selectedPlayers = ref<ParticipatingPlayer[]>([]);

const { addGame, addParticipatingPlayersToGame } = useGames();

const parseGameFromForm = (): InsertTeam => {
  return {
    team_id: teamId.value,
    date: form.values.date,
    is_home_game: form.values.isHomeGame,
    opponent_team_name: form.values.opponentTeamName,
  };
};

const router = useRouter();
const createGame = async () => {
  const { data } = await addGame(parseGameFromForm());

  const gameId = data?.[0].id;

  if (gameId) {
    const { data: participatingPlayers } = await addParticipatingPlayersToGame(
      gameId,
      selectedPlayers.value
    );

    if (participatingPlayers) {
      router.push(`/teams/${teamId.value}/games/${gameId}`);
    }
  }
};

const handleErrors = (errors: InvalidSubmissionContext) => {
  console.error("Form errors!", errors);
};

const onSubmit = form.handleSubmit(createGame, handleErrors);
</script>
