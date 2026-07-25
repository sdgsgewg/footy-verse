import { PositionQuery } from "@/types/position";

export const positionKeys = {
  all: ["positions"] as const,

  lists: () => [...positionKeys.all, "list"] as const,

  list: (params?: PositionQuery) => [...positionKeys.lists(), params] as const,

  details: () => [...positionKeys.all, "detail"] as const,

  detail: (slug: string) => [...positionKeys.details(), slug] as const,

  edits: () => [...positionKeys.all, "edit"] as const,

  edit: (id: string) => [...positionKeys.edits(), id] as const,
};
