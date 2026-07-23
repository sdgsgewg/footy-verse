import { GetNationalTeamsParams } from "@/types/national-team";

export const nationalTeamKeys = {
  all: ["national-teams"] as const,

  lists: () => [...nationalTeamKeys.all, "list"] as const,

  list: (nationId: string, params?: GetNationalTeamsParams) =>
    [...nationalTeamKeys.lists(), nationId, params] as const,

  details: () => [...nationalTeamKeys.all, "detail"] as const,

  detail: (nationId: string, teamId: string) =>
    [...nationalTeamKeys.details(), nationId, teamId] as const,

  edits: () => [...nationalTeamKeys.all, "edit"] as const,

  edit: (nationId: string, teamId: string) =>
    [...nationalTeamKeys.edits(), nationId, teamId] as const,
};
