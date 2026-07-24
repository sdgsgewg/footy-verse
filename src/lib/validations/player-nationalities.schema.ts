import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerNationalityMutationSchema = z.object({
  nation_id: idSchema,
  display_order: z.coerce.number().int().min(1).max(99),
});

export const createPlayerNationalitySchema = playerNationalityMutationSchema;

export const updatePlayerNationalitySchema = playerNationalityMutationSchema;

export const playerNationalitySchema = playerNationalityMutationSchema.extend({
  id: idSchema,
  player_id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerNationalitiesSchema = z.array(playerNationalitySchema);
