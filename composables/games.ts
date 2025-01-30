import type { AccessType, PlayerPositions } from "~/types/database.enums";
import type { TablesInsert } from "~/types/database.types.ts";

export type InsertGame = TablesInsert<"games">;
export type GameMember = {
  userId: string;
  gameId: string;
  access: AccessType;
  name: string;
  uniformNumber: number[];
  positions: PlayerPositions[];
};

export const useGames = () => {
  const client = useSupabaseClient();

  const addGame = (game: InsertGame) => {
    return client.from("games").insert(game).select();
  };

  return { addGame };
};
