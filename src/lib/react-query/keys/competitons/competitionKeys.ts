import { CompetitionQuery } from "@/types/competition";

export const competitionKeys = {
  all: ["competitions"] as const,

  lists: () => [...competitionKeys.all, "list"] as const,

  list: (params?: CompetitionQuery) =>
    [...competitionKeys.lists(), params] as const,

  details: () => [...competitionKeys.all, "detail"] as const,

  detail: (id: string) => [...competitionKeys.details(), id] as const,

  edits: () => [...competitionKeys.all, "edit"] as const,

  edit: (id: string) => [...competitionKeys.edits(), id] as const,
};
