<template>
  <section v-if="game" class="flex flex-col gap-4 p-4">
    <section>
      <h1 class="font-bold">{{ game.teams.name }} vs {{ game.opponent_team_name }}</h1>
    </section>

    <section>
      <h2 class="font-bold">Sets</h2>
      <ul>
        <template v-for="set in game.game_sets">
          <li v-if="set" :key="set.id">
            <p>{{ set.name }} - {{ set.uniform_number }} - {{ set.positions.join(" | ") }}</p>
          </li>
        </template>
      </ul>

      <Button @click="goToNewGame">New Set</Button>
    </section>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();

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

const goToNewGame = () => {
  router.push(`/teams/${route.params.team_id}/games/${route.params.game_id}/sets/new`);
};
</script>
