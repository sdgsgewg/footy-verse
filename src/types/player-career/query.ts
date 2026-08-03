import { DbPlayerShirtNumberRow } from "../player-shirt-number";
import { DbPlayerRow } from "../player/query";
import { PlayerCareer } from "./database";

// Player Career Detail

export type DbPlayerCareerDetailRow = PlayerCareer;

// Helper for other entity

export type DbPlayerCareerWithShirtNumbersRow = Pick<
  PlayerCareer,
  "id" | "player_id" | "joined_at" | "left_at" | "career_type"
> & {
  player_shirt_numbers: DbPlayerShirtNumberRow[];
};

// National Team

export type DbPlayerCareerWithPlayerRow = {
  player: DbPlayerRow;
};
