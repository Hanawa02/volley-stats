<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <InputFormField
      class="pb-4"
      name="email"
      type="email"
      :placeholder="login_form_email_placeholder()"
    >
      <template v-slot:label>
        {{ login_form_email_label() }}
      </template>
    </InputFormField>

    <InputFormField
      class="mb-4"
      name="password"
      type="password"
      :placeholder="login_form_password_placeholder()"
    >
      <template v-slot:label>
        {{ login_form_password_label() }}
      </template>
    </InputFormField>

    <Button type="submit">{{ login_form_button() }}</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import {
  login_form_email_label,
  login_form_email_placeholder,
  login_form_password_label,
  login_form_password_placeholder,
  login_form_button,
} from "translations";

import * as z from "zod";

import { Button } from "~/components/ui/button";
import InputFormField from "~/components/ui/InputFormField.vue";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const supabase = useSupabaseClient();

type LoginForm = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginForm) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (data) {
    await navigateTo("/");
  }
  if (error) console.log(error);
};

const onSubmit = form.handleSubmit(loginUser, (errors) => {
  console.log("Form errors!", errors);
});
</script>
