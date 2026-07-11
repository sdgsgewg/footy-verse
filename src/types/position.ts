import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createPositionSchema,
  positionMutationSchema,
  positionsQuerySchema,
  updatePositionSchema,
} from "@/lib/validations/positions.schema";

// Supabase Table
export type Position = Tables<"positions">;
export type PositionInsert = TablesInsert<"positions">;
export type PositionUpdate = TablesUpdate<"positions">;

// Repo Request (from zod)
export type GetPositionsParams = z.infer<typeof positionsQuerySchema>;
export type PositionCreateInput = z.infer<typeof createPositionSchema>;
export type PositionUpdateInput = z.infer<typeof updatePositionSchema>;

// DTO helper

// API Response DTO
export type PositionListItem = Position;
export type PositionDetailResponse = Position;

// Mutation
export type UpsertPositionInput = z.infer<typeof positionMutationSchema> & {
  id?: string;
};

// Others

export type PositionStatus = "active" | "inactive";
