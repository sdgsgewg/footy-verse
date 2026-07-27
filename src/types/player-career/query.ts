import { PlayerClubCareerQuery } from "../player-club-career";
import { PlayerNationalTeamCareerQuery } from "../player-national-team-career";
import { PlayerShirtNumberSummary } from "../player-shirt-number";
import { PlayerCareer } from "./database";

// Player Career Detail

export type DbPlayerCareerDetailRow = PlayerCareer;

// Helper for other entity

export type PlayerCareerQuery = Pick<
  PlayerCareer,
  "id" | "joined_at" | "left_at" | "career_type"
> & {
  player_shirt_numbers: PlayerShirtNumberSummary[];
  player_club_career: PlayerClubCareerQuery | null;
  player_national_team_career: PlayerNationalTeamCareerQuery | null;
};

export type PlayerCareerWithShirtNumbersQuery = Pick<
  PlayerCareer,
  "id" | "player_id" | "joined_at" | "left_at" | "career_type"
> & {
  player_shirt_numbers: PlayerShirtNumberSummary[];
};
