export const searchKeys = {
  all: ["search"] as const,

  global: (query: string) => [...searchKeys.all, "global", query] as const,

  suggestions: (query: string) =>
    [...searchKeys.all, "suggestions", query] as const,
};
