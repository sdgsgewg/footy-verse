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

// DTO helper

// API Response DTO
export type NationalityListItem = Nationality;
export type NationalityDetailResponse = Nationality;

// Mutation
export type UpsertNationalityInput = z.infer<
  typeof nationalityMutationSchema
> & {
  id?: string;
} & ImagePayload;

// Others

export type NationalityStatus = "active" | "inactive";
