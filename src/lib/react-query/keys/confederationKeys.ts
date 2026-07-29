import { ConfederationQuery } from "@/types/confederation";

export const confederationKeys = {
  all: ["confederations"] as const,

  lists: () => [...confederationKeys.all, "list"] as const,

  list: (params?: ConfederationQuery) =>
    [...confederationKeys.lists(), params] as const,

  details: () => [...confederationKeys.all, "detail"] as const,

  detail: (id: string) => [...confederationKeys.details(), id] as const,

  edits: () => [...confederationKeys.all, "edit"] as const,

  edit: (id: string) => [...confederationKeys.edits(), id] as const,
};
