import { GetClubsParams } from "@/types/club";

export const clubKeys = {
  all: ["clubs"] as const,

  lists: () => [...clubKeys.all, "list"] as const,

  list: (params?: GetClubsParams) => [...clubKeys.lists(), params] as const,

  details: () => [...clubKeys.all, "detail"] as const,

  detail: (slug: string) => [...clubKeys.details(), slug] as const,

  edits: () => [...clubKeys.all, "edit"] as const,

  edit: (id: string) => [...clubKeys.edits(), id] as const,
};
