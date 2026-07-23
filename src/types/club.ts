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

// Data type for relation tables (can be used as a type for supabase query or DTO)

type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

// Supabase Query Result

// Club List

export type DbClubListRow = Pick<Club, "id" | "image" | "name" | "slug"> & {
  nation: NationalitySummary | null;
};

// Club Detail

export type DbClubDetailRow = Club & {
  nation: NationalitySummary | null;
};

// API Response DTO

export interface Nationality {
  id: string;
  imageUrl: string;
  name: string;
}

// Club List

export interface ClubListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  nation: Nationality | null;
}

// Club Detail

// Model for Edit

export interface ClubEditResponse {
  id: string;
  image: string | null;
  name: string;
  nationId: string | null;
}

// Model View Detail

export interface ClubDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  nation: Nationality | null;
}

export interface ClubLookupResponse {
  id: string;
  slug: string;
}

// Mutation
export type UpsertClubInput = z.infer<typeof clubMutationSchema> & {
  id?: string;
} & ImagePayload;

// Others
