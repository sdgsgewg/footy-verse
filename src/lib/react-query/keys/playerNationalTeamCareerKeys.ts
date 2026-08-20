export const playerNationalTeamCareerKeys = {
  all: ["player-national-team-careers"] as const,

  lists: () => [...playerNationalTeamCareerKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerNationalTeamCareerKeys.lists(), playerId] as const,

  details: () => [...playerNationalTeamCareerKeys.all, "detail"] as const,

  detail: (playerId: string, playerNationalTeamCareerId: string) =>
    [
      ...playerNationalTeamCareerKeys.details(),
      playerId,
      playerNationalTeamCareerId,
    ] as const,

  edits: () => [...playerNationalTeamCareerKeys.all, "edit"] as const,

  edit: (playerId: string, playerNationalTeamCareerId: string) =>
    [
      ...playerNationalTeamCareerKeys.edits(),
      playerId,
      playerNationalTeamCareerId,
    ] as const,
};
