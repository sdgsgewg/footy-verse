import { GetClubTeamsParams } from "@/types/club-team";

export const clubTeamKeys = {
  all: ["club-teams"] as const,

  lists: () => [...clubTeamKeys.all, "list"] as const,

  list: (clubId: string, params?: GetClubTeamsParams) =>
    [...clubTeamKeys.lists(), clubId, params] as const,

  details: () => [...clubTeamKeys.all, "detail"] as const,

  detail: (clubId: string, teamId: string) =>
    [...clubTeamKeys.details(), clubId, teamId] as const,

  edits: () => [...clubTeamKeys.all, "edit"] as const,

  edit: (clubId: string, teamId: string) =>
    [...clubTeamKeys.edits(), clubId, teamId] as const,
};
