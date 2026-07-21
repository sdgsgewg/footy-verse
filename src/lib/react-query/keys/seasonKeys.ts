import { GetSeasonsParams } from "@/types/season";

export const seasonKeys = {
  all: ["seasons"] as const,

  lists: () => [...seasonKeys.all, "list"] as const,

  list: (params?: GetSeasonsParams) => [...seasonKeys.lists(), params] as const,
};
