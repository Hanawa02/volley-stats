<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{{ add_member_dialog_title({ roleName }) }}</AlertDialogTitle>
          <AlertDialogDescription>
            <InputFormField
              name="name"
              type="text"
              :placeholder="add_member_dialog_form_name_placeholder()"
            >
              <template v-slot:label>
                {{ add_member_dialog_form_name_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_name_description() }}
                </InfoTooltip>
              </template>
            </InputFormField>

            <AccessTypeFormField name="access">
              <template v-slot:label>
                {{ add_member_dialog_form_access_type_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_access_type_description() }}
                </InfoTooltip>
              </template>
            </AccessTypeFormField>
            <PlayerPositionFormField name="positions">
              <template v-slot:label>
                {{ add_member_dialog_form_player_positions_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_player_positions_description() }}
                </InfoTooltip>
              </template>
            </PlayerPositionFormField>
            <UniformNumberFormField name="uniformNumbers">
              <template v-slot:label>
                {{ add_member_dialog_form_player_positions_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_player_positions_description() }}
                </InfoTooltip>
              </template>
            </UniformNumberFormField>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{{ add_member_dialog_cancel_button() }}</AlertDialogCancel>
          <Button type="submit">{{ add_member_dialog_add_more_button() }}</Button>
          <AlertDialogAction type="submit">{{ add_member_dialog_add_button() }}</AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import InputFormField from "~/components/ui/InputFormField.vue";
import AccessTypeFormField from "~/components/ui/AccessTypeFormField.vue";
import PlayerPositionFormField from "~/components/ui/PlayerPositionFormField.vue";
import UniformNumberFormField from "~/components/ui/UniformNumberFormField.vue";
import InfoTooltip from "~/components/ui/InfoTooltip.vue";
import { Button } from "~/components/ui/button";

import {
  add_member_dialog_title,
  add_member_dialog_form_access_type_label,
  add_member_dialog_form_access_type_description,
  add_member_dialog_form_name_label,
  add_member_dialog_form_name_placeholder,
  add_member_dialog_cancel_button,
  add_member_dialog_add_button,
  add_member_dialog_add_more_button,
  add_member_dialog_form_player_positions_label,
  add_member_dialog_form_player_positions_description,
} from "translations";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

type Props = {
  roleName?: string;
};

defineProps<Props>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    access: z.string(),
    uniformNumbers: z.array(z.string()).optional(),
    positions: z.array(z.string()).optional(),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    uniformNumbers: [],
    positions: [],
  },
});

const emit = defineEmits<{
  (e: "addMember", member: RoleMember): void;
}>();

const onSubmit = form.handleSubmit(async (values) => {
  const validUniformNumbers = values.uniformNumbers
    .filter((n) => !isNaN(n))
    .map((n) => parseInt(n));
  const validValues = { ...values, uniformNumbers: validUniformNumbers };

  emit("addMember", validValues);

  if (form.values) {
    form.resetForm();
    addMember;
  }
});
</script>
