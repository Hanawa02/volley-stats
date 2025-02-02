<template>
  <details>
    <summary>data structure</summary>
    .
    <pre>{{ set }}</pre>
    .
  </details>
  <section v-if="set" class="flex flex-col gap-4 p-4">
    <section>
      <h1 class="font-bold">Set {{ set.set_number }} - {{ set.team_name }}</h1>
    </section>

    <section>
      <HalfCourt class="lg:max-w-96 h-fit">
        <template #opponent>
          <div class="text-lg text-center p-2 font-semibold text-red-900">
            {{ opponentTeamName }}
          </div>
        </template>
      </HalfCourt>
    </section>
  </section>
</template>

<script setup lang="ts">
import HalfCourt from "~/components/sets/HalfCourt.vue";

const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();

const teamId = computed(() => route.params.team_id);
const gameId = computed(() => route.params.game_id);
const setId = computed(() => route.params.set_id);

const opponentTeamName = computed(() => set.value.opponent_team_name);

const { data: set } = await useAsyncData("set", async (context) => {
  if (!user.value) {
    return;
  }

  const { data: sets, error } = await client
    .from("sets")
    .select(
      `*, 
      games(
        is_home_game, 
        opponent_team_name, 
        teams(
          name,
          logo_url
        ),
        game_participating_players(
          player_id,
          uniform_number,
          team_members(
            name,
            positions
          )
        )
      )`
    )
    .eq("id", setId.value)
    .order("created_at");

  const playerPosFixes = [1, 2, 3, 4, 5, 6];
  const liberoPosFixes = [1, 2];

  const rawSet = sets[0];
  const formattedSet = {
    ...rawSet,
    team_name: rawSet.games.teams.name,
    team_logo_url: rawSet.games.teams.logo_url,
    opponent_team_name: rawSet.games.opponent_team_name,
    ...playerPosFixes.reduce((acc, pos) => {
      const key = `starting_player_${pos}`;
      const playerId = rawSet[key];
      const player = rawSet.games.game_participating_players.find((p) => p.player_id === playerId);
      return {
        ...acc,
        [key]: {
          player_id: playerId,
          uniform_number: player.uniform_number,
          name: player.team_members.name,
          positions: player.team_members.positions,
        },
      };
    }, {}),
  };
  return formattedSet;
});

const goToNewGame = () => {
  router.push(`/teams/${route.params.team_id}/games/${route.params.game_id}/sets/new`);
};
</script>
