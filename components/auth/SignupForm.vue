<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <InputFormField name="displayName" type="text" :placeholder="signup_form_display_name_placeholder()">
      <template v-slot:label>
        {{ signup_form_display_name_label() }}
        <InfoTooltip>
          {{ signup_form_display_name_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <InputFormField name="email" type="email" :placeholder="signup_form_email_placeholder()">
      <template v-slot:label>
        {{ signup_form_email_label() }}
        <InfoTooltip>
          {{ signup_form_email_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <InputFormField name="password" type="password" :placeholder="signup_form_password_placeholder()">
      <template v-slot:label>
        {{ signup_form_password_label() }}
        <InfoTooltip>
          {{ signup_form_password_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <Button type="submit">{{ signup_form_button() }}</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  signup_form_email_label,
  signup_form_email_placeholder,
  signup_form_password_label,
  signup_form_password_placeholder,
  signup_form_button,
  signup_form_display_name_label,
  signup_form_display_name_description,
  signup_form_display_name_placeholder,
  signup_form_email_description,
  signup_form_password_description,
} from "translations";

import { Button } from "~/components/ui/button";
import InputFormField from "~/components/ui/InputFormField.vue";
import InfoTooltip from "~/components/ui/InfoTooltip.vue";

const formSchema = toTypedSchema(
  z.object({
    displayName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const supabase = useSupabaseClient();

type SignupForm = {
  email: string;
  password: string;
  displayName: string;
};

const signUpUser = async ({ email, password, displayName }: SignupForm) => {
  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        displayName,
      },
    },
  });
  if (error) console.log(error);
  if (data) {
    await navigateTo("/");
  }
};

const onSubmit = form.handleSubmit(signUpUser, (errors) => {
  console.log("Form errors!", errors);
});
</script>
