import { DbNationalTeamRow } from "../national-team";
import {
  DbPlayerCareerWithPlayerRow,
  PlayerCareerWithShirtNumbersQuery,
} from "../player-career";
import { PlayerNationalTeamCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerNationalTeamCareerListRow = Pick<
  PlayerNationalTeamCareer,
  "id"
> & {
  national_team: DbNationalTeamRow;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Player Career Detail

export type DbPlayerNationalTeamCareerDetailRow = PlayerNationalTeamCareer & {
  national_team: DbNationalTeamRow;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Helper for other entity

// Player

export type PlayerNationalTeamCareerQuery = Pick<
  PlayerNationalTeamCareer,
  "id" | "national_team_id"
> & {
  national_team: DbNationalTeamRow;
};

export type DbPlayerNationalTeamCareerRow = {
  player_career: {
    player_id: string;
  };
};

// National Team

export type DbPlayerNationalTeamCareerWithPlayerCareerRow = {
  player_career: DbPlayerCareerWithPlayerRow;
};
