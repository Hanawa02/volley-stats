import type { AccessType, PlayerPositions } from "~/types/database.enums";
import type { TablesInsert } from "~/types/database.types.ts";

export type InsertGame = TablesInsert<"games">;
export type ParticipatingPlayer = {
  playerId: string;
  uniformNumber: number;
};

export const useGames = () => {
  const client = useSupabaseClient();

  const addParticipatingPlayersToGame = (gameId: string, players: ParticipatingPlayer[]) => {
    const mappedPlayers = players.map(({ playerId, uniformNumber }) => ({
      game_id: gameId,
      player_id: playerId,
      uniform_number: uniformNumber,
    }));
    return client.from("game_participating_players").insert(mappedPlayers).select();
  };

  const addGame = (game: InsertGame) => {
    return client.from("games").insert(game).select();
  };

  return { addGame, addParticipatingPlayersToGame };
};
