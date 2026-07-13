export const queryKeys = {
  players: () => ["players"] as const,
  player: (id: string) => ["players", id] as const,

  player_careers: (playerId: string) => ["player-careers", playerId] as const,
  player_career: (careerId: string) => ["player-careers", careerId] as const,

  clubs: () => ["clubs"] as const,
  club: (id: string) => ["clubs", id] as const,

  nationalities: () => ["nationalities"] as const,

  positions: () => ["positions"] as const,

  seasons: () => ["seasons"] as const,

  regions: () => ["regions"] as const,

  competitions: () => ["competitions"] as const,
  competition: (id: string) => ["competitions", id] as const,
};
