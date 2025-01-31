<template>
  <section class="p-4">
    <h1>{{ games_new_headline() }}</h1>
    <NewSetForm />
  </section>
</template>

<script setup lang="ts">
import NewSetForm from "~/components/sets/NewSetForm.vue";

import { games_new_headline } from "translations";
</script>
