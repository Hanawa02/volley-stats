<template>
  <section class="p-4">
    <h1>{{ games_new_headline() }}</h1>
    <NewGameForm />
  </section>
</template>

<script setup lang="ts">
import NewGameForm from "~/components/games/NewGameForm.vue";

import { games_new_headline } from "translations";
</script>
