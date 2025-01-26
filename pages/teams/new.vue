<template>
  <section class="p-4">
    <h1>{{ teams_new_headline() }}</h1>
    <NewTeamForm />
  </section>
</template>

<script setup lang="ts">
import NewTeamForm from "~/components/teams/NewTeamForm.vue";

import { teams_new_headline } from "translations";
</script>
