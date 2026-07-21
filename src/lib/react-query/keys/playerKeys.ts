import { GetPlayersParams } from "@/types/player";

export const playerKeys = {
  all: ["players"] as const,

  lists: () => [...playerKeys.all, "list"] as const,

  list: (params?: GetPlayersParams) => [...playerKeys.lists(), params] as const,

  details: () => [...playerKeys.all, "detail"] as const,

  detail: (id: string) => [...playerKeys.details(), id] as const,

  edits: () => [...playerKeys.all, "edit"] as const,

  edit: (id: string) => [...playerKeys.edits(), id] as const,
};
