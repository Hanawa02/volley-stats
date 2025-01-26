<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <InputFormField name="name" type="text" :placeholder="new_team_form_name_placeholder()">
      <template v-slot:label>
        {{ new_team_form_name_label() }}
        <InfoTooltip>
          {{ new_team_form_name_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <InputFormField name="logoUrl" type="text" :placeholder="new_team_form_logo_url_placeholder()">
      <template v-slot:label>
        {{ new_team_form_logo_url_label() }}
        <InfoTooltip>
          {{ new_team_form_logo_url_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <MembersTable v-model="members" :teamName="form.values.name"></MembersTable>

    <Button type="submit" class="mt-6 sticky bottom-0">
      {{ new_team_form_submit_button() }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionContext } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { useTeams, type InsertTeam } from "~/composables/teams";
import { AccessType, PlayerPositions } from "~/types/database.enums.ts";

import {
  new_team_form_name_label,
  new_team_form_name_placeholder,
  new_team_form_name_description,
  new_team_form_logo_url_label,
  new_team_form_logo_url_placeholder,
  new_team_form_logo_url_description,
  new_team_form_submit_button,
} from "translations";

import MembersTable, { type TeamMember } from "~/components/teams/MembersTable.vue";

import { Button } from "~/components/ui/button";
import InputFormField from "~/components/ui/InputFormField.vue";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    logoUrl: z.string().optional().nullable(),
  })
);

const user = useSupabaseUser();

const members = ref<TeamMember[]>(
  user.value
    ? [
        {
          name: user.value.user_metadata.displayName,
          userId: user.value.id,
          uniformNumbers: [],
          access: "admin",
          positions: ["setter"],
        },
      ]
    : []
);

const form = useForm({
  validationSchema: formSchema,
});

const { addTeam, addMembersToTeam } = useTeams();

const parseTeamFromForm = (): InsertTeam => {
  return {
    name: form.values.name ?? "Nameless Team",
    logo_url: form.values.logoUrl,
  };
};

const router = useRouter();
const createTeam = async () => {
  const { data } = await addTeam(parseTeamFromForm());

  const teamId = data?.[0].id;

  if (teamId) {
    const { data: membersData } = await addMembersToTeam(teamId, members.value);

    if (membersData) {
      router.push("/teams");
    }
  }
};

const handleErrors = (errors: InvalidSubmissionContext) => {
  console.error("Form errors!", errors);
};

const onSubmit = form.handleSubmit(createTeam, handleErrors);
</script>
