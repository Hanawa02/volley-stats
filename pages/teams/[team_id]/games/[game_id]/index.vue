<template>
  <section v-if="game" class="flex flex-col gap-4 p-4">
    <section>
      <h1 class="font-bold">{{ game.teams.name }} vs {{ game.opponent_team_name }}</h1>
    </section>

    <section>
      <h2 class="font-bold">Sets</h2>
      <ul>
        <template v-for="set of game.sets">
          <li v-if="set" :key="set.id">
            <NuxtLink :to="`/teams/${teamId}/games/${gameId}/sets/${set.id}`"
              >Set {{ set.set_number }}</NuxtLink
            >
          </li>
        </template>
      </ul>

      <Button @click="goToNewSet">New Set</Button>
    </section>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const router = useRouter();

const teamId = computed(() => route.params.team_id);
const gameId = computed(() => route.params.game_id);

const { data: game } = await useAsyncData("game", async (context) => {
  if (!user.value) {
    return;
  }

  const { data: games, error } = await client
    .from("games")
    .select("*, sets(*), teams(*)")
    .eq("id", route.params.game_id)
    .order("created_at");

  return games[0];
});

const goToNewSet = () => {
  router.push(`/teams/${route.params.team_id}/games/${route.params.game_id}/sets/new`);
};
</script>
