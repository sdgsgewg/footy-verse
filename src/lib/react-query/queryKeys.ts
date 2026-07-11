export const queryKeys = {
  players: () => ["players"] as const,
  player: (id: string) => ["players", id] as const,
  
  clubs: () => ["clubs"] as const,
  club: (id: string) => ["clubs", id] as const,

  nationalities: () => ["nationalities"] as const,

  positions: () => ["positions"] as const,
};
