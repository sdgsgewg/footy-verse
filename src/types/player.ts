import z from "zod";

import { ImagePayload } from "./image";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createPlayerSchema,
  playerMutationSchema,
  playersQuerySchema,
  updatePlayerSchema,
} from "@/lib/validations/players.schema";
import { createPlayerPositionSchema } from "@/lib/validations/player-positions.schema";
import { createPlayerCareerSchema } from "@/lib/validations/player-careers.schema";
import { createPlayerNationalTeamSchema } from "@/lib/validations/player-national-teams.schema";

// Supabase Table
export type Player = Tables<"players">;
export type PlayerInsert = TablesInsert<"players">;
export type PlayerUpdate = TablesUpdate<"players">;

// Repo Request (from zod)
export type GetPlayersParams = z.infer<typeof playersQuerySchema>;
export type PlayerCreateInput = z.infer<typeof createPlayerSchema>;
export type PlayerUpdateInput = z.infer<typeof updatePlayerSchema>;

export type PlayerPositionCreateInput = z.infer<
  typeof createPlayerPositionSchema
>;
export type PlayerCareerCreateInput = z.infer<typeof createPlayerCareerSchema>;
export type PlayerNationalTeamCreateInput = z.infer<
  typeof createPlayerNationalTeamSchema
>;

// Hasil query supabase
export type PlayerPosition = Tables<"player_positions"> & {
  position: Tables<"positions">;
};
type PlayerCareer = Tables<"player_careers"> & {
  club: Tables<"clubs">;
};
type PlayerNationalTeam = Tables<"player_national_teams"> & {
  nationality: Tables<"nationalities">;
};

type PositionSummary = Pick<Tables<"positions">, "id" | "name">;

type ClubSummary = Pick<Tables<"clubs">, "id" | "name" | "image">;

type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

export type DbPlayerListRow = Pick<
  Player,
  "id" | "image" | "name" | "slug" | "market_value"
> & {
  player_positions: {
    display_order: number;
    position: PositionSummary;
  }[];

  player_careers: {
    joined_at: string;
    left_at: string | null;
    club: ClubSummary;
  }[];

  player_national_teams: {
    end_date: string | null;
    nationality: NationalitySummary;
  }[];
};

export type DbPlayerDetailRow = Player & {
  player_positions: PlayerPosition[];
  player_careers: PlayerCareer[];
  player_national_teams: PlayerNationalTeam[];
};

// API Response DTO
export interface PlayerListItem {
  id: string;
  image: string | null;
  name: string;
  slug: string;

  main_position: {
    id: string;
    name: string;
  } | null;

  current_club: {
    id: string;
    name: string;
    image: string | null;
  } | null;

  current_national_team: {
    id: string;
    name: string;
    image: string | null;
  } | null;

  market_value: number;
}

export type PlayerDetailResponse = Player & {
  positions: PlayerPosition[];
  careers: PlayerCareer[];
  national_teams: PlayerNationalTeam[];
};

// Mutation
export type UpsertPlayerInput = z.infer<typeof playerMutationSchema> & {
  id?: string;
} & ImagePayload;

// Others

export type PlayerStatus = "active" | "inactive";
