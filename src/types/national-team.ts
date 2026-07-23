import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createNationalTeamSchema,
  nationalTeamMutationSchema,
  nationalTeamsQuerySchema,
  updateNationalTeamSchema,
} from "@/lib/validations/national-teams.schema";

// Supabase Table
export type NationalTeam = Tables<"national_teams">;
export type NationalTeamInsert = TablesInsert<"national_teams">;
export type NationalTeamUpdate = TablesUpdate<"national_teams">;

// Repo Request (from zod)
export type GetNationalTeamsParams = z.infer<typeof nationalTeamsQuerySchema>;
export type NationalTeamCreateInput = z.infer<typeof createNationalTeamSchema>;
export type NationalTeamUpdateInput = z.infer<typeof updateNationalTeamSchema>;

// Data type for relation tables (can be used as a type for supabase query or DTO)

type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

// Supabase Query Result

// National Team List

export type DbNationalTeamListRow = Pick<
  NationalTeam,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};

// National Team Detail

export type DbNationalTeamDetailRow = NationalTeam & {
  nation: NationalitySummary;
};

// API Response DTO

// National Team List

export interface NationalTeamListItem {
  id: string;
  imageUrl: string;
  name: string;
  teamCategory: string;
  ageGroup: string;
}

// National Team Detail

// Model for Edit

export interface NationalTeamEditResponse {
  id: string;
  teamCategory: string;
  ageGroup: string;
  nationId: string;
}

// Model for Detail

export interface NationalTeamDetailResponse {
  id: string;
  teamCategory: string;
  ageGroup: string;
  nationId: string;
}

// Model Lookup

export interface NationalTeamLookupResponse {
  id: string;
}

// Mutation
export type UpsertNationalTeamInput = z.infer<
  typeof nationalTeamMutationSchema
> & {
  id?: string;
};

// Others
