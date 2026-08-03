import { Player } from "./database";
import { DbPlayerPositionRow } from "../player-position";
import { DbPlayerNationalityRow } from "../player-nationality";
import { PlayerClubCareer } from "../player-club-career";
import { DbClubTeamRow } from "../club-team";
import { PlayerContractSummary } from "../player-contract";
import { PlayerCareer } from "../player-career";
import { DbPlayerShirtNumberRow } from "../player-shirt-number";
import { PlayerNationalTeamCareer } from "../player-national-team-career";
import { DbNationalTeamRow } from "../national-team";
import { PlayerTransfer } from "../player-transfer";

// Supabase query result

// Player List

export type DbPlayerListRow = Pick<
  Player,
  "id" | "image" | "name" | "slug" | "dob" | "market_value"
> & {
  player_positions: DbPlayerPositionRow[];
  player_nationalities: DbPlayerNationalityRow[];
  player_careers: DbPlayerCareerRow[];
};

export type DbPlayerListQueryRow = DbPlayerListRow & {
  club_team_filter?: unknown[];
  national_team_filter?: unknown[];
};

// Player Detail

type DbPlayerTransferRow = Pick<PlayerTransfer, "id" | "transfer_type">;

export type DbPlayerClubCareerRow = Pick<
  PlayerClubCareer,
  "id" | "club_team_id"
> & {
  club_team: DbClubTeamRow;
  player_contracts: PlayerContractSummary[];
  player_transfer: DbPlayerTransferRow;
};

export type DbPlayerNationalTeamCareerRow = Pick<
  PlayerNationalTeamCareer,
  "id" | "national_team_id"
> & {
  national_team: DbNationalTeamRow;
};

export type DbPlayerCareerRow = Pick<
  PlayerCareer,
  "id" | "joined_at" | "left_at" | "career_type"
> & {
  player_shirt_numbers: DbPlayerShirtNumberRow[];
  player_club_career: DbPlayerClubCareerRow | null;
  player_national_team_career: DbPlayerNationalTeamCareerRow | null;
};

export type DbPlayerDetailRow = Player & {
  player_positions: DbPlayerPositionRow[];
  player_nationalities: DbPlayerNationalityRow[];
  player_careers: DbPlayerCareerRow[];
};

// Helper

// National Team

export type DbPlayerRow = Pick<Player, "id" | "market_value">;
