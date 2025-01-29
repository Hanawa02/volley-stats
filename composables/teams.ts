import type { AccessType, PlayerPositions } from "~/types/database.enums";
import type { TablesInsert } from "~/types/database.types.ts";

export type InsertTeam = TablesInsert<"teams">;
export type TeamMember = {
  userId: string;
  teamId: string;
  access: AccessType;
  name: string;
  uniformNumber: number[];
  positions: PlayerPositions[];
};

export const useTeams = () => {
  const client = useSupabaseClient();

  const addMembersToTeam = (teamId: string, members: TeamMember[]) => {
    const mappedMembers = members.map(({ userId, access, name, uniformNumber, positions }) => ({
      team_id: teamId,
      name: name,
      user_id: userId,
      uniform_number: uniformNumber,
      access: access,
      positions: positions,
    }));
    return client.from("team_members").insert(mappedMembers).select();
  };

  const addTeam = (team: InsertTeam) => {
    return client.from("teams").insert(team).select();
  };

  return { addTeam, addMembersToTeam };
};
