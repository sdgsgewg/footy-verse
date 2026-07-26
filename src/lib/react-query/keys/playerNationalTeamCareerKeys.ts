export const playerNationalTeamCareerKeys = {
  all: ["player-national-team-careers"] as const,

  lists: () => [...playerNationalTeamCareerKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerNationalTeamCareerKeys.lists(), playerId] as const,

  details: () => [...playerNationalTeamCareerKeys.all, "detail"] as const,

  detail: (playerId: string, nationalTeamId: string) =>
    [
      ...playerNationalTeamCareerKeys.details(),
      playerId,
      nationalTeamId,
    ] as const,

  edits: () => [...playerNationalTeamCareerKeys.all, "edit"] as const,

  edit: (playerId: string, nationalTeamId: string) =>
    [
      ...playerNationalTeamCareerKeys.edits(),
      playerId,
      nationalTeamId,
    ] as const,
};
