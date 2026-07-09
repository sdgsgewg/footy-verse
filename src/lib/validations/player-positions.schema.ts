import { z } from "zod";

export const playerPositionIdSchema = z.string().uuid();

export const playerPositionMutationSchema = z.object({
  position_id: z.string().uuid(),
  display_order: z.coerce.number().int().min(1).max(99),
});

export const createPlayerPositionSchema = playerPositionMutationSchema;

export const updatePlayerPositionSchema = playerPositionMutationSchema;

export const playerPositionSchema = playerPositionMutationSchema.extend({
  id: playerPositionIdSchema,
  player_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerClubsSchema = z.array(playerPositionSchema);
