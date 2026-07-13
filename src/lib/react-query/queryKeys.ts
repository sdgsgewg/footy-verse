export const queryKeys = {
  players: () => ["players"] as const,
  player: (id: string) => ["players", id] as const,

  player_careers: () => ["player-careers"] as const,
  player_career: (id: string) => ["player-careers", id] as const,

  clubs: () => ["clubs"] as const,
  club: (id: string) => ["clubs", id] as const,

  nationalities: () => ["nationalities"] as const,

  positions: () => ["positions"] as const,

  seasons: () => ["seasons"] as const,

  regions: () => ["regions"] as const,

  competitions: () => ["competitions"] as const,
  competition: (id: string) => ["competitions", id] as const,
};
