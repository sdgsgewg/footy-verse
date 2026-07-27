import { NationalTeamQuery } from "@/types/national-team";

export const nationalTeamKeys = {
  all: ["national-teams"] as const,

  lists: () => [...nationalTeamKeys.all, "list"] as const,

  list: (params?: NationalTeamQuery) =>
    [...nationalTeamKeys.lists(), params] as const,

  details: () => [...nationalTeamKeys.all, "detail"] as const,

  detail: (nationId: string, teamId: string) =>
    [...nationalTeamKeys.details(), teamId] as const,

  edits: () => [...nationalTeamKeys.all, "edit"] as const,

  edit: (nationId: string, teamId: string) =>
    [...nationalTeamKeys.edits(), teamId] as const,
};
