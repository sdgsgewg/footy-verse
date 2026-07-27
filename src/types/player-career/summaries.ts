import { PlayerCareer } from "./database";

export type PlayerCareerSummary = Pick<
  PlayerCareer,
  "id" | "player_id" | "joined_at" | "left_at"
>;
