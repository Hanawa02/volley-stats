import type { AccessType, PlayerPositions } from "~/types/database.enums";
import type { TablesInsert } from "~/types/database.types.ts";

export type InsertSet = TablesInsert<"sets">;

export const useSets = () => {
  const client = useSupabaseClient();

  const addSet = (set: InsertSet) => {
    return client.from("sets").insert(set).select();
  };

  return { addSet };
};
