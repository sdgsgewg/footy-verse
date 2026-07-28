import { ClubTeamSummary } from "../club-team";
import { PlayerCareerWithShirtNumbersQuery } from "../player-career";
import { PlayerContractSummary } from "../player-contract";
import { DbPlayerTransferRow } from "../player-transfer";
import { PlayerClubCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerClubCareerListRow = Pick<PlayerClubCareer, "id"> & {
  club_team: ClubTeamSummary;
  player_career: PlayerCareerWithShirtNumbersQuery;
};

// Player Club Career Detail

export type DbPlayerClubCareerDetailRow = PlayerClubCareer & {
  club_team: ClubTeamSummary;
  player_career: PlayerCareerWithShirtNumbersQuery;
  player_contracts: PlayerContractSummary[];
  player_transfer: DbPlayerTransferRow;
};

// Helper for other entity (player)

export type PlayerClubCareerQuery = Pick<
  PlayerClubCareer,
  "id" | "club_team_id"
> & {
  club_team: ClubTeamSummary;
  player_contracts: PlayerContractSummary[];
};
