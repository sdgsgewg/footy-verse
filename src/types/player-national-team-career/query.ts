import { DbNationalTeamRow } from "../national-team";
import {
  DbPlayerCareerWithPlayerRow,
  DbPlayerCareerWithShirtNumbersRow,
  PlayerCareer,
} from "../player-career";
import { PlayerNationalTeamCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerNationalTeamCareerListRow = Pick<
  PlayerNationalTeamCareer,
  "id"
> & {
  national_team: DbNationalTeamRow;
  player_career: DbPlayerCareerWithShirtNumbersRow;
};

// Player Career Detail

export type DbPlayerNationalTeamCareerDetailRow = PlayerNationalTeamCareer & {
  national_team: DbNationalTeamRow;
  player_career: DbPlayerCareerWithShirtNumbersRow;
};

// Helper for other entity

export type DbPlayerNationalTeamCareerRow = {
  player_career: Pick<PlayerCareer, "left_at"> & {
    player_id: string;
  };
};

// National Team

export type DbPlayerNationalTeamCareerWithPlayerCareerRow = {
  player_career: DbPlayerCareerWithPlayerRow;
};
