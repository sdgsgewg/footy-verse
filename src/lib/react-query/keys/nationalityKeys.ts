import { GetNationalitiesParams } from "@/types/nationality";

export const nationalityKeys = {
  all: ["nationalities"] as const,

  lists: () => [...nationalityKeys.all, "list"] as const,

  list: (params?: GetNationalitiesParams) => [...nationalityKeys.lists(), params] as const,

  details: () => [...nationalityKeys.all, "detail"] as const,

  detail: (id: string) => [...nationalityKeys.details(), id] as const,
};
