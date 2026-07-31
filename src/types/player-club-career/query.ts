import { DbClubTeamRow } from "../club-team";
import {
  DbPlayerCareerWithPlayerRow,
  PlayerCareerWithShirtNumbersQuery,
} from "../player-career";
import { PlayerContractSummary } from "../player-contract";
import { DbPlayerTransferRow } from "../player-transfer";
import { PlayerClubCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerClubCareerListRow = Pick<PlayerClubCareer, "id"> & {
  club_team: DbClubTeamRow;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Player Club Career Detail

export type DbPlayerClubCareerDetailRow = PlayerClubCareer & {
  club_team: DbClubTeamRow;
  player_career: PlayerCareerWithShirtNumbersQuery;
  player_contracts: PlayerContractSummary[];
  player_transfer: DbPlayerTransferRow;
};

// Helper for other entity

// Player

export type PlayerClubCareerQuery = Pick<
  PlayerClubCareer,
  "id" | "club_team_id"
> & {
  club_team: DbClubTeamRow;
  player_contracts: PlayerContractSummary[];
};

export type DbPlayerClubCareerRow = {
  player_career: {
    player_id: string;
  };
};

// Club Team

export type DbPlayerClubCareerWithPlayerCareerRow = {
  player_career: DbPlayerCareerWithPlayerRow;
};
