import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createSeasonSchema,
  seasonMutationSchema,
  seasonsQuerySchema,
  updateSeasonSchema,
} from "@/lib/validations/seasons.schema";

// Supabase Table
export type Season = Tables<"seasons">;
export type SeasonInsert = TablesInsert<"seasons">;
export type SeasonUpdate = TablesUpdate<"seasons">;

// Repo Request (from zod)
export type GetSeasonsParams = z.infer<typeof seasonsQuerySchema>;
export type SeasonCreateInput = z.infer<typeof createSeasonSchema>;
export type SeasonUpdateInput = z.infer<typeof updateSeasonSchema>;

// DTO helper

// API Response DTO
export type SeasonListItem = Season;
export type SeasonDetailResponse = Season;

// Mutation
export type UpsertSeasonInput = z.infer<typeof seasonMutationSchema> & {
  id?: string;
};

// Others
