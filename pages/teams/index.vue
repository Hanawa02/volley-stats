<template>
  <section>
    <h1>Your teams</h1>

    <NuxtLink to="/teams/new">Create a Team</NuxtLink>

    <h2 class="mt-8">Teams</h2>
    <ul v-if="teams">
      <template v-for="team in teams">
        <li v-if="team" :key="team?.id">
          <NuxtLink :to="`/teams/${team?.id}`"> {{ team?.name }}</NuxtLink>
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const { data: teams } = await useAsyncData("teams", async () => {
  if (!user.value) {
    return;
  }

  const { data } = await client.from("teams").select().order("created_at");

  return data ?? [];
});
</script>
