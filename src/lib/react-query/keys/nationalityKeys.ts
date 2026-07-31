import { NationalityQuery } from "@/types/nationality";

export const nationalityKeys = {
  all: ["nationalities"] as const,

  lists: () => [...nationalityKeys.all, "list"] as const,

  list: (params?: NationalityQuery) =>
    [...nationalityKeys.lists(), params] as const,

  options: () => [...nationalityKeys.all, "options"] as const,

  details: () => [...nationalityKeys.all, "detail"] as const,

  detail: (id: string) => [...nationalityKeys.details(), id] as const,

  edits: () => [...nationalityKeys.all, "edit"] as const,

  edit: (id: string) => [...nationalityKeys.edits(), id] as const,
};
