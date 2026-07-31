import { DbClubTeamRow } from "../club-team";
import { PlayerCareer } from "../player-career";
import { SeasonSummary } from "../season";
import { PlayerTransfer } from "./database";

// Player Transfer List

type PlayerTransferFilterQuery = {
  player_career: Pick<PlayerCareer, "player_id">;
};

export type DbPlayerTransferListRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;
  season: SeasonSummary;

  player_club_career: PlayerTransferFilterQuery;
};

// Player Transfer Detail

export type DbPlayerTransferDetailRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;
  season: SeasonSummary;
};

// Helper for other entity

export type DbPlayerTransferRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;
  season: SeasonSummary;
};
