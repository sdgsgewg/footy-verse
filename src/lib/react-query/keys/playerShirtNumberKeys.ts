import { PlayerShirtNumberQuery } from "@/types/player-shirt-number";

export const playerShirtNumberKeys = {
  all: ["player-shirt-numbers"] as const,

  clubTeamLists: () => [...playerShirtNumberKeys.all, "clubTeamList"] as const,

  clubTeamList: (playerId: string, params?: PlayerShirtNumberQuery) =>
    [...playerShirtNumberKeys.clubTeamLists(), playerId, params] as const,

  nationalTeamLists: () =>
    [...playerShirtNumberKeys.all, "nationalTeamList"] as const,

  nationalTeamList: (playerId: string, params?: PlayerShirtNumberQuery) =>
    [...playerShirtNumberKeys.nationalTeamLists(), playerId, params] as const,
};
