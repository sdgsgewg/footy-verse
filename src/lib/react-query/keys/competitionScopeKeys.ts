import { CompetitionScopeQuery } from "@/types/competition-scope";

export const competitionScopeKeys = {
  all: ["competition-scopes"] as const,

  lists: () => [...competitionScopeKeys.all, "list"] as const,

  list: (params?: CompetitionScopeQuery) =>
    [...competitionScopeKeys.lists(), params] as const,

  details: () => [...competitionScopeKeys.all, "detail"] as const,

  detail: (slug: string) => [...competitionScopeKeys.details(), slug] as const,

  edits: () => [...competitionScopeKeys.all, "edit"] as const,

  edit: (id: string) => [...competitionScopeKeys.edits(), id] as const,
};
