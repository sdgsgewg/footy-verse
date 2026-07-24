import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerPositionMutationSchema = z.object({
  position_id: idSchema,
  display_order: z.coerce.number().int().min(1).max(99),
});

export const createPlayerPositionSchema = playerPositionMutationSchema;

export const updatePlayerPositionSchema = playerPositionMutationSchema;

export const playerPositionSchema = playerPositionMutationSchema.extend({
  id: idSchema,
  player_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerPsitionsSchema = z.array(playerPositionSchema);
