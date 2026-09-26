import { CompetitionSeasonQuery } from "@/types/competition-season";

export const competitionSeasonKeys = {
  all: ["competition-seasons"] as const,

  lists: () => [...competitionSeasonKeys.all, "list"] as const,

  list: (competitionId: string, params?: CompetitionSeasonQuery) =>
    [...competitionSeasonKeys.lists(), competitionId, params] as const,

  options: () => [...competitionSeasonKeys.all, "options"] as const,

  details: () => [...competitionSeasonKeys.all, "detail"] as const,

  detail: (competitionId: string, competitionSeasonId: string) =>
    [
      ...competitionSeasonKeys.details(),
      competitionId,
      competitionSeasonId,
    ] as const,

  edits: () => [...competitionSeasonKeys.all, "edit"] as const,

  edit: (competitionId: string, competitionSeasonId: string) =>
    [
      ...competitionSeasonKeys.edits(),
      competitionId,
      competitionSeasonId,
    ] as const,
};
