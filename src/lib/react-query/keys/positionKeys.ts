import { GetPositionsParams } from "@/types/position";

export const positionKeys = {
  all: ["seasons"] as const,

  lists: () => [...positionKeys.all, "list"] as const,

  list: (params?: GetPositionsParams) =>
    [...positionKeys.lists(), params] as const,
};
