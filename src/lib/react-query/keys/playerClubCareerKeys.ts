export const playerClubCareerKeys = {
  all: ["player-club-careers"] as const,

  lists: () => [...playerClubCareerKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerClubCareerKeys.lists(), playerId] as const,

  details: () => [...playerClubCareerKeys.all, "detail"] as const,

  detail: (playerId: string, playerClubCareerId: string) =>
    [...playerClubCareerKeys.details(), playerId, playerClubCareerId] as const,

  edits: () => [...playerClubCareerKeys.all, "edit"] as const,

  edit: (playerId: string, playerClubCareerId: string) =>
    [...playerClubCareerKeys.edits(), playerId, playerClubCareerId] as const,
};
