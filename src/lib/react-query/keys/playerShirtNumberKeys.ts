import { PlayerShirtNumberQuery } from "@/types/player-shirt-number";

export const playerShirtNumberKeys = {
  all: ["player-shirt-numbers"] as const,

  clubTeams: () => [...playerShirtNumberKeys.all, "club-teams"] as const,

  clubTeam: (playerId: string, params?: PlayerShirtNumberQuery) =>
    [...playerShirtNumberKeys.clubTeams(), playerId, params] as const,

  nationalTeams: () =>
    [...playerShirtNumberKeys.all, "national-teams"] as const,

  nationalTeam: (playerId: string, params?: PlayerShirtNumberQuery) =>
    [...playerShirtNumberKeys.nationalTeams(), playerId, params] as const,
};
