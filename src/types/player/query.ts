// Supabase query result

import { Player } from "./database";
import { DbPlayerPositionRow } from "../player-position";
import { PlayerNationalityQuery } from "../player-nationality";
import { PlayerCareerQuery } from "../player-career/query";

// Player List

export type DbPlayerListRow = Pick<
  Player,
  "id" | "image" | "name" | "slug" | "market_value"
> & {
  player_positions: DbPlayerPositionRow[];
  player_nationalities: PlayerNationalityQuery[];
  player_careers: PlayerCareerQuery[];
};

// Player Detail

export type DbPlayerDetailRow = Player & {
  player_positions: DbPlayerPositionRow[];
  player_nationalities: PlayerNationalityQuery[];
  player_careers: PlayerCareerQuery[];
};
