import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerShirtNumberMutationSchema = z.object({
  shirt_number: z.number().min(1).max(99),
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
