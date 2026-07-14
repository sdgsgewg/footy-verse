export const STORAGE_BUCKETS = {
  PLAYERS: "player-images",
  CLUBS: "club-images",
  NATIONALITIES: "nation-images",
  COMPETITIONS: "competition-images",
} as const;

export type StorageBucket =
  (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
