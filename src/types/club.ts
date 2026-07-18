import z from "zod";

import {
  clubMutationSchema,
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";
import { ImagePayload } from "./image";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

// Supabase Table
export type Club = Tables<"clubs">;
export type ClubInsert = TablesInsert<"clubs">;
export type ClubUpdate = TablesUpdate<"clubs">;

// Repo Request (from zod)
export type GetClubsParams = z.infer<typeof clubsQuerySchema>;
export type ClubCreateInput = z.infer<typeof createClubSchema>;
export type ClubUpdateInput = z.infer<typeof updateClubSchema>;

// DTO helper
type ClubSummary = Pick<Club, "id" | "name" | "image">;

type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

// API Response DTO
export interface ClubListItem extends Omit<
  Club,
  "nation_id" | "parent_club_id"
> {
  nation: NationalitySummary | null;
  parent_club: ClubSummary | null;
}

export interface ClubDetailResponse extends Club {
  nation: NationalitySummary | null;
  parent_club: ClubSummary | null;
}

// Mutation
export type UpsertClubInput = z.infer<typeof clubMutationSchema> & {
  id?: string;
} & ImagePayload;

// Others
