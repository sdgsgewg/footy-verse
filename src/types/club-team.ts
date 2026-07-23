import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  clubTeamsQuerySchema,
  clubTeamMutationSchema,
  createClubTeamSchema,
  updateClubTeamSchema,
} from "@/lib/validations/club-teams.schema";

// Supabase Table
export type ClubTeam = Tables<"club_teams">;
export type ClubTeamInsert = TablesInsert<"club_teams">;
export type ClubTeamUpdate = TablesUpdate<"club_teams">;

// Repo Request (from zod)
export type GetClubTeamsParams = z.infer<typeof clubTeamsQuerySchema>;
export type ClubTeamCreateInput = z.infer<typeof createClubTeamSchema>;
export type ClubTeamUpdateInput = z.infer<typeof updateClubTeamSchema>;

// Data type for relation tables (can be used as a type for supabase query or DTO)

type ClubSummary = Pick<Tables<"clubs">, "id" | "name" | "image">;

// Supabase Query Result

// Club Team List

export type DbClubTeamListRow = Pick<
  ClubTeam,
  "id" | "squad_type" | "age_group"
> & {
  club: ClubSummary;
};

// Club Team Detail

export type DbClubTeamDetailRow = ClubTeam & {
  club: ClubSummary;
};

// API Response DTO

// Club List

export interface ClubTeamListItem {
  id: string;
  imageUrl: string;
  name: string;
  squadType: string;
  ageGroup: string | null;
}

// Club Detail

// Model for Edit

export interface ClubTeamEditResponse {
  id: string;
  squadType: string;
  ageGroup: string | null;
  clubId: string;
}

// Model for Detail

export interface ClubTeamDetailResponse {
  id: string;
  squadType: string;
  ageGroup: string | null;
  clubId: string;
}

// Model Lookup

export interface ClubTeamLookupResponse {
  id: string;
}

// Mutation
export type UpsertClubTeamInput = z.infer<typeof clubTeamMutationSchema> & {
  id?: string;
};

// Others
