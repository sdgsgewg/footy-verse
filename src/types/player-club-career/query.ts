import { ClubTeamSummary } from "../club-team";
import { PlayerCareerSummary } from "../player-career";
import { PlayerContractSummary } from "../player-contract";
import { PlayerShirtNumberSummary } from "../player-shirt-number";
import { PlayerTransferQuery } from "../player-transfer";
import { PlayerClubCareer } from "./database";

// Supabase Query Result

// Player Career List

export type DbPlayerClubCareerListRow = Pick<PlayerClubCareer, "id"> & {
  club_team: ClubTeamSummary;
  player_career: PlayerCareerSummary;
};

// Player Club Career Detail

export type DbPlayerClubCareerDetailRow = PlayerClubCareer & {
  club_team: ClubTeamSummary;
  player_career: PlayerCareerSummary;
  player_contracts: PlayerContractSummary[];
  player_shirt_numbers: PlayerShirtNumberSummary[];
  player_transfer: PlayerTransferQuery;
};

// Helper for other entity (player)

export type PlayerClubCareerQuery = Pick<
  PlayerClubCareer,
  "id" | "club_team_id"
> & {
  club_team: ClubTeamSummary;
  player_contracts: PlayerContractSummary[];
};
