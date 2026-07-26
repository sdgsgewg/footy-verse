// Supabase Query Result

import { NationalTeamSummary } from "../national-team";
import { PlayerCareerSummary } from "../player-career";
import { PlayerShirtNumberSummary } from "../player-shirt-number";
import { PlayerNationalTeamCareer } from "./database";

// Player Career List

export type DbPlayerNationalTeamCareerListRow = Pick<
  PlayerNationalTeamCareer,
  "id"
> & {
  national_team: NationalTeamSummary;
  player_career: PlayerCareerSummary;
};

// Player Career Detail

export type DbPlayerNationalTeamCareerDetailRow = PlayerNationalTeamCareer & {
  national_team: NationalTeamSummary;
  player_career: PlayerCareerSummary;
  player_shirt_numbers: PlayerShirtNumberSummary[];
};

// Helper for other entity

export type PlayerNationalTeamCareerQuery = Pick<
  PlayerNationalTeamCareer,
  "id" | "national_team_id"
> & {
  national_team: NationalTeamSummary;
};
