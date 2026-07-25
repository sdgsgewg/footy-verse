import { SeasonQuery } from "@/types/season";

export const seasonKeys = {
  all: ["seasons"] as const,

  lists: () => [...seasonKeys.all, "list"] as const,

  list: (params?: SeasonQuery) => [...seasonKeys.lists(), params] as const,
};
