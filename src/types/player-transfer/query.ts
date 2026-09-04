import { DbClubTeamRow } from "../club-team";
import { PlayerCareer } from "../player-career";
import { Player } from "../player/database";
import { PlayerTransfer } from "./database";

// Player Transfer List

type PlayerTransferFilterQuery = {
  player_career: Pick<PlayerCareer, "player_id">;
};

export type DbAllPlayerTransferListRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;

  player_club_team_career: {
    player_career: {
      player: Pick<Player, "id" | "short_name" | "slug" | "image">;
    };
  };
};

export type DbPlayerTransferListRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;

  player_club_team_career: PlayerTransferFilterQuery;
};

// Player Transfer Detail

export type DbPlayerTransferDetailRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;
};

// Helper for other entity

export type DbPlayerTransferRow = PlayerTransfer & {
  from_club_team: DbClubTeamRow;
  to_club_team: DbClubTeamRow;
};
