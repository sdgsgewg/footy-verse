export const playerNationalTeamKeys = {
  all: ["player-national-teams"] as const,

  lists: () => [...playerNationalTeamKeys.all, "list"] as const,

  list: (playerId: string) =>
    [...playerNationalTeamKeys.lists(), playerId] as const,

  details: () => [...playerNationalTeamKeys.all, "detail"] as const,

  detail: (playerId: string, nationalTeamId: string) =>
    [...playerNationalTeamKeys.details(), playerId, nationalTeamId] as const,

  edits: () => [...playerNationalTeamKeys.all, "edit"] as const,

  edit: (playerId: string, nationalTeamId: string) =>
    [...playerNationalTeamKeys.edits(), playerId, nationalTeamId] as const,
};
