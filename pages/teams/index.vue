<template>
  <section>
    <h1>Your teams</h1>

    <NuxtLink to="/teams/new">Create a Team</NuxtLink>

    <h2 class="mt-8">Teams</h2>
    <ul v-if="teams">
      <li v-for="team in teams" :key="team?.id">
        <NuxtLink :to="`/teams/${team.id}`"> {{ team?.name }}</NuxtLink>
      </li>
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

  const { data } = await client
    .from("team_members")
    .select("id, teams:team_id(*)")
    .eq("email", user.value.email)
    .order("created_at");

  return data?.map((team) => team.teams) ?? [];
});
</script>
