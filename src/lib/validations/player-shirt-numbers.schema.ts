import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { playerShirtNumberSortBySchema, sortOrderSchema } from "./enums.schema";

export const playerShirtNumberMutationSchema = z.object({
  player_career_id: idSchema.optional(),
  shirt_number: z.number().positive().min(1).max(99).nullable(),
  start_date: z.string(),
  end_date: nullableDate.optional(),
});

export const createPlayerShirtNumberSchema = playerShirtNumberMutationSchema;

export const updatePlayerShirtNumberSchema = playerShirtNumberMutationSchema;

export const playerShirtNumberSchema = playerShirtNumberMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerShirtNumbersSchema = z.array(playerShirtNumberSchema);

export const playerShirtNumbersQuerySchema = z.object({
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  sortBy: playerShirtNumberSortBySchema.default("start_date"),
  sortOrder: sortOrderSchema.default("desc"),
});
