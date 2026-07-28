import { RegionQuery } from "@/types/region";

export const regionKeys = {
  all: ["regions"] as const,

  lists: () => [...regionKeys.all, "list"] as const,

  list: (params?: RegionQuery) => [...regionKeys.lists(), params] as const,

  details: () => [...regionKeys.all, "detail"] as const,

  detail: (id: string) => [...regionKeys.details(), id] as const,

  edits: () => [...regionKeys.all, "edit"] as const,

  edit: (id: string) => [...regionKeys.edits(), id] as const,
};
