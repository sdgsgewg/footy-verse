import { nullableDate } from "@/utils/date";
import { z } from "zod";

export const playerShirtNumberIdSchema = z.string().uuid();

export const playerShirtNumberMutationSchema = z.object({
  player_career_id: z.string().uuid(),
  shirt_number: z.number().min(1).max(99),
  start_date: z.string(),
  end_date: nullableDate.optional(),
});

export const createPlayerShirtNumberSchema = playerShirtNumberMutationSchema;

export const updatePlayerShirtNumberSchema = playerShirtNumberMutationSchema;

export const playerShirtNumberSchema = playerShirtNumberMutationSchema.extend({
  id: playerShirtNumberIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerShirtNumbersSchema = z.array(playerShirtNumberSchema);
