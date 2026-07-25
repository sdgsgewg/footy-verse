// Supabase query result

import { Tables } from "@/lib/database.types";
import {
  ClubTeamSummary,
  NationalitySummary,
  NationalTeamSummary,
  PlayerContractSummary,
  PlayerShirtNumberSummary,
  PositionSummary,
} from "./summaries";
import { Player } from "./database";

export type DbPlayerPosition = Pick<
  Tables<"player_positions">,
  "display_order" | "position_id"
> & {
  position: PositionSummary;
};

export type DbPlayerNationality = Pick<
  Tables<"player_nationalities">,
  "display_order" | "nation_id"
> & {
  nationality: NationalitySummary;
};

export type DbPlayerNationalTeam = Pick<
  Tables<"player_national_teams">,
  "id" | "shirt_number" | "start_date" | "end_date" | "national_team_id"
> & {
  national_team: NationalTeamSummary;
};

// Player List

export type DbPlayerCareer = Pick<
  Tables<"player_careers">,
  "id" | "joined_at" | "left_at" | "club_team_id"
> & {
  club_team: ClubTeamSummary;
  player_shirt_numbers: PlayerShirtNumberSummary[];
};

export type DbPlayerListRow = Pick<
  Player,
  "id" | "image" | "name" | "slug" | "market_value"
> & {
  player_positions: DbPlayerPosition[];
  player_nationalities: DbPlayerNationality[];
  player_careers: DbPlayerCareer[];
  player_national_teams: DbPlayerNationalTeam[];
};

// Player Detail

export type DbPlayerDetailCareer = Pick<
  Tables<"player_careers">,
  "id" | "joined_at" | "left_at" | "club_team_id"
> & {
  club_team: ClubTeamSummary;
  player_contracts: PlayerContractSummary[];
  player_shirt_numbers: PlayerShirtNumberSummary[];
};

export type DbPlayerDetailRow = Player & {
  player_positions: DbPlayerPosition[];
  player_nationalities: DbPlayerNationality[];
  player_careers: DbPlayerDetailCareer[];
  player_national_teams: DbPlayerNationalTeam[];
};
