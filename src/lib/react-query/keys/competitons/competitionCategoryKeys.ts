import { CompetitionCategoryQuery } from "@/types/competition-category";

export const competitionCategoryKeys = {
  all: ["competition-categories"] as const,

  lists: () => [...competitionCategoryKeys.all, "list"] as const,

  list: (params?: CompetitionCategoryQuery) =>
    [...competitionCategoryKeys.lists(), params] as const,

  options: () => [...competitionCategoryKeys.all, "options"] as const,

  details: () => [...competitionCategoryKeys.all, "detail"] as const,

  detail: (slug: string) =>
    [...competitionCategoryKeys.details(), slug] as const,

  edits: () => [...competitionCategoryKeys.all, "edit"] as const,

  edit: (id: string) => [...competitionCategoryKeys.edits(), id] as const,
};
