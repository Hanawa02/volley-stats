<template>
  <section class="p-4">
    <h1>{{ signup_headline() }}</h1>
    <SignupForm class="mb-4" />
    <NuxtLink to="/auth/login" class="decoration">Login Instead</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import SignupForm from "~/components/auth/SignupForm.vue";
import { signup_headline } from "translations";
</script>
