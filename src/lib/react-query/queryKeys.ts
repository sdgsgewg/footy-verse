export const queryKeys = {
  players: () => ["players"] as const,
  player: (id: string) => ["players", id] as const,

  clubs: () => ["clubs"] as const,

  nationalities: () => ["nationalities"] as const,

  positions: () => ["positions"] as const,
};
