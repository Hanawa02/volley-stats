<template>
  <section class="p-4">
    <h1>{{ login_headline() }}</h1>

    <LoginForm class="mb-4" />

    <NuxtLink to="/auth/signup">{{ login_sign_up_link() }}</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import LoginForm from "~/components/auth/LoginForm.vue";
import { login_headline, login_sign_up_link } from "translations";
</script>
