import { GroupedPlayerQuery, PlayerQuery } from "@/types/player";

export const playerKeys = {
  all: ["players"] as const,

  lists: () => [...playerKeys.all, "list"] as const,

  list: (params?: PlayerQuery) => [...playerKeys.lists(), params] as const,

  groupedLists: () => [...playerKeys.all, "grouped"] as const,

  groupedList: (params?: GroupedPlayerQuery) =>
    [...playerKeys.groupedLists(), params] as const,

  details: () => [...playerKeys.all, "detail"] as const,

  detail: (id: string) => [...playerKeys.details(), id] as const,

  edits: () => [...playerKeys.all, "edit"] as const,

  edit: (id: string) => [...playerKeys.edits(), id] as const,
};
