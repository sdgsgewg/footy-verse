import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createPlayerNationalTeamSchema,
  updatePlayerNationalTeamSchema,
} from "@/lib/validations/player-national-teams.schema";

// Supabase Table
export type PlayerNationalTeam = Tables<"player_national_teams">;
export type PlayerNationalTeamInsert = TablesInsert<"player_national_teams">;
export type PlayerNationalTeamUpdate = TablesUpdate<"player_national_teams">;

// Repo Request & Mutation (from zod)
export type PlayerNationalTeamCreateInput = z.infer<
  typeof createPlayerNationalTeamSchema
>;
export type PlayerNationalTeamUpdateInput = z.infer<
  typeof updatePlayerNationalTeamSchema
>;

// Data type for relation tables (can be used as a type for supabase query or DTO)

type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "image" | "name"
>;

type NationalTeamSummary = Pick<
  Tables<"national_teams">,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};

// Supabase Query Result

// Player National Team List

export type DbPlayerNationalTeamListRow = Pick<
  PlayerNationalTeam,
  "id" | "shirt_number" | "start_date" | "end_date"
> & {
  nationalTeam: NationalTeamSummary;
};

// Player National Team Detail

export type DbPlayerNationalTeamDetailRow = PlayerNationalTeam & {
  nationalTeam: NationalTeamSummary;
};

// API Response DTO

// Player National Team List

export interface PlayerNationalTeamListItem {
  id: string;
  imageUrl: string;
  name: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

// Player National Team Detail

// Model For Edit

export interface PlayerNationalTeamEditResponse {
  id: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
  nationalTeamId: string;
}

// Model View Detail

export interface PlayerNationalTeamDetailResponse {
  id: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
  nationalTeamId: string;
}

export interface PlayerNationalTeamLookupResponse {
  id: string;
}

// Others
