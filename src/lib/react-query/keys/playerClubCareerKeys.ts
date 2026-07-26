export const playerClubCareerKeys = {
  all: ["player-club-careers"] as const,

  lists: () => [...playerClubCareerKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerClubCareerKeys.lists(), playerId] as const,

  details: () => [...playerClubCareerKeys.all, "detail"] as const,

  detail: (playerId: string, careerId: string) =>
    [...playerClubCareerKeys.details(), playerId, careerId] as const,

  edits: () => [...playerClubCareerKeys.all, "edit"] as const,

  edit: (playerId: string, careerId: string) =>
    [...playerClubCareerKeys.edits(), playerId, careerId] as const,
};
