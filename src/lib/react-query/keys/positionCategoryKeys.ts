import { PositionCategoryQuery } from "@/types/position-category";

export const positionCategoryKeys = {
  all: ["position-categories"] as const,

  lists: () => [...positionCategoryKeys.all, "list"] as const,

  list: (params?: PositionCategoryQuery) =>
    [...positionCategoryKeys.lists(), params] as const,

  options: () => [...positionCategoryKeys.all, "options"] as const,

  details: () => [...positionCategoryKeys.all, "detail"] as const,

  detail: (slug: string) => [...positionCategoryKeys.details(), slug] as const,

  edits: () => [...positionCategoryKeys.all, "edit"] as const,

  edit: (id: string) => [...positionCategoryKeys.edits(), id] as const,
};
