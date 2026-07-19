import { GetClubsParams } from "@/types/club";

export const queryKeys = {
  players: () => ["players"] as const,
  player: (id: string) => ["players", id] as const,

  player_careers: (playerId: string) => ["player-careers", playerId] as const,
  player_career: (playerId: string, careerId: string) =>
    ["player-careers", playerId, careerId] as const,

  clubs: (params?: GetClubsParams) => ["clubs", params] as const,
  club: (slug: string) => ["clubs", slug] as const,

  nationalities: () => ["nationalities"] as const,

  positions: () => ["positions"] as const,

  seasons: () => ["seasons"] as const,

  regions: () => ["regions"] as const,

  competitions: () => ["competitions"] as const,
  competition: (id: string) => ["competitions", id] as const,
};
