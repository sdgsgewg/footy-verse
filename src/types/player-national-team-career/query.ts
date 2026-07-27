// Supabase Query Result

import { NationalTeamSummary } from "../national-team";
import {
  PlayerCareerWithShirtNumbersQuery,
} from "../player-career";
import { PlayerNationalTeamCareer } from "./database";

// Player Career List

export type DbPlayerNationalTeamCareerListRow = Pick<
  PlayerNationalTeamCareer,
  "id"
> & {
  national_team: NationalTeamSummary;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Player Career Detail

export type DbPlayerNationalTeamCareerDetailRow = PlayerNationalTeamCareer & {
  national_team: NationalTeamSummary;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Helper for other entity

export type PlayerNationalTeamCareerQuery = Pick<
  PlayerNationalTeamCareer,
  "id" | "national_team_id"
> & {
  national_team: NationalTeamSummary;
};
