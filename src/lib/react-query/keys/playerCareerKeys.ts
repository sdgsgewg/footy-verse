export const playerCareerKeys = {
  all: ["player-careers"] as const,

  lists: () => [...playerCareerKeys.all, "list"] as const,

  list: (playerId: string) => [...playerCareerKeys.lists(), playerId] as const,

  details: () => [...playerCareerKeys.all, "detail"] as const,

  detail: (playerId: string, careerId: string) =>
    [...playerCareerKeys.details(), playerId, careerId] as const,

  edits: () => [...playerCareerKeys.all, "edit"] as const,

  edit: (playerId: string, careerId: string) =>
    [...playerCareerKeys.edits(), playerId, careerId] as const,
};
