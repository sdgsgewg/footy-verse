import { DbClubTeamRow } from "../club-team";
import {
  DbPlayerCareerWithPlayerRow,
  DbPlayerCareerWithShirtNumbersRow,
  PlayerCareer,
} from "../player-career";
import { PlayerContractSummary } from "../player-contract";
import { DbPlayerTransferRow } from "../player-transfer";
import { PlayerClubTeamCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerClubTeamCareerListRow = Pick<PlayerClubTeamCareer, "id"> & {
  club_team: DbClubTeamRow;
  player_career: DbPlayerCareerWithShirtNumbersRow;
};

// Player Club Career Detail

export type DbPlayerClubTeamCareerDetailRow = PlayerClubTeamCareer & {
  club_team: DbClubTeamRow;
  player_career: DbPlayerCareerWithShirtNumbersRow;
  player_contracts: PlayerContractSummary[];
  player_transfer: DbPlayerTransferRow;
};

// Helper for other entity

// Player

export type DbPlayerClubTeamCareerRow = {
  player_career: Pick<PlayerCareer, "left_at"> & {
    player_id: string;
  };
};

// Club Team

export type DbPlayerClubTeamCareerWithPlayerCareerRow = {
  player_career: Pick<PlayerCareer, "left_at"> & DbPlayerCareerWithPlayerRow;
};
