export const playerClubTeamCareerKeys = {
  all: ["player-club-team-careers"] as const,

  lists: () => [...playerClubTeamCareerKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerClubTeamCareerKeys.lists(), playerId] as const,

  details: () => [...playerClubTeamCareerKeys.all, "detail"] as const,

  detail: (playerId: string, playerClubTeamCareerId: string) =>
    [
      ...playerClubTeamCareerKeys.details(),
      playerId,
      playerClubTeamCareerId,
    ] as const,

  edits: () => [...playerClubTeamCareerKeys.all, "edit"] as const,

  edit: (playerId: string, playerClubTeamCareerId: string) =>
    [
      ...playerClubTeamCareerKeys.edits(),
      playerId,
      playerClubTeamCareerId,
    ] as const,
};
