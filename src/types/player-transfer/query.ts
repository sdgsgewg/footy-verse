import { ClubTeamSummary } from "../club-team";
import { SeasonSummary } from "../season";
import { PlayerTransfer } from "./database";

// Player Transfer Detail

export type DbPlayerTransferDetailRow = PlayerTransfer & {
  from_club_team: ClubTeamSummary;
  to_club_team: ClubTeamSummary;
  season: SeasonSummary;
};

// Helper for other entity

export type PlayerTransferQuery = PlayerTransfer & {
  from_club_team: ClubTeamSummary;
  to_club_team: ClubTeamSummary;
  season: SeasonSummary;
};
