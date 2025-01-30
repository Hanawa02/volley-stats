<template>
  <section v-if="team" class="flex flex-col gap-4 p-4">
    <section class="flex gap-4 items-center">
      <img class="rounded-full w-16 h-16 object-contain" :src="team.logo_url" :alt="team.name" />
      <h1 class="font-bold">{{ team.name }}</h1>
    </section>

    <section>
      <h2 class="font-bold">Members</h2>
      <ul>
        <template v-for="member in team.team_members">
          <li v-if="member" :key="member.id">
            <p>
              {{ member.name }} - {{ member.uniform_number }} - {{ member.positions.join(" | ") }}
            </p>
          </li>
        </template>
      </ul>
    </section>

    <section>
      <h2 class="font-bold">Games</h2>

      <ul>
        <template v-for="game in team.games">
          <li v-if="game" :key="game.id">
            <NuxtLink :to="`/teams/${team.id}/games/${game.id}`">
              {{ game.opponent_team_name }} - {{ game.date }} -
              {{ game.is_home_game ? "Home" : "Away" }}
            </NuxtLink>
          </li>
        </template>
      </ul>

      <Button @click="goToNewGame">New Game</Button>
    </section>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();

const { data: team } = await useAsyncData("team", async (context) => {
  if (!user.value) {
    return;
  }

  const { data: teams, error } = await client
    .from("teams")
    .select("*, team_members(*), games(*)")
    .eq("id", route.params.team_id)
    .order("created_at");

  return teams[0];
});

const router = useRouter();

const goToNewGame = () => {
  console.log(team);
  router.push(`/teams/${team.value.id}/games/new`);
};
</script>
