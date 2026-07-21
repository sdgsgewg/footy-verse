import z from "zod";

import {
  createNationalitySchema,
  nationalitiesQuerySchema,
  nationalityMutationSchema,
  updateNationalitySchema,
} from "@/lib/validations/nationalities.schema";
import { ImagePayload } from "./image";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

// Supabase Table
export type Nationality = Tables<"nationalities">;
export type NationalityInsert = TablesInsert<"nationalities">;
export type NationalityUpdate = TablesUpdate<"nationalities">;

// Repo Request (from zod)
export type GetNationalitiesParams = z.infer<typeof nationalitiesQuerySchema>;
export type NationalityCreateInput = z.infer<typeof createNationalitySchema>;
export type NationalityUpdateInput = z.infer<typeof updateNationalitySchema>;

// Supabase Query Result

// Club List

export type DbNationalityListRow = Pick<
  Nationality,
  "id" | "image" | "name" | "slug"
>;

// Club Detail

export type DbNationalityDetailRow = Nationality;

// DTO helper

// API Response DTO

// Nationality List

export interface NationalityListItem {
  id: string;
  image: string | null;
  imageUrl: string;
  name: string;
  slug: string;
}

// Nationality Detail

// Model for Edit

export interface NationalityEditResponse {
  id: string;
  image: string | null;
  name: string;
}

// Model View Detail

export interface NationalityDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
}

export interface NationalityLookupResponse {
  id: string;
  slug: string;
}

// Mutation
export type UpsertNationalityInput = z.infer<
  typeof nationalityMutationSchema
> & {
  id?: string;
} & ImagePayload;

// Others

export type NationalityStatus = "active" | "inactive";
