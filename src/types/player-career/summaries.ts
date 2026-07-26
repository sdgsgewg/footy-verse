import { PlayerCareer } from "./database";

export type PlayerCareerSummary = Pick<
  PlayerCareer,
  "id" | "joined_at" | "left_at"
>;
