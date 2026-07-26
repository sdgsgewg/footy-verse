import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { transferTypeSchema } from "./enums.schema";
import { sortingQuerySchema } from "./query.schema";

export const playerTransferMutationSchema = z.object({
  player_club_career_id: idSchema.optional(),
  season_id: idSchema,
  from_club_team_id: idSchema,
  to_club_team_id: idSchema,
  transfer_type: transferTypeSchema,
  transfer_fee: z.coerce.number().nonnegative(),
  transfer_date: z.string(),
});

export const createPlayerTransferSchema = playerTransferMutationSchema;

export const updatePlayerTransferSchema = playerTransferMutationSchema;

export const playerTransferSchema = playerTransferMutationSchema.extend({
  id: idSchema,
  player_club_career_id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerTransfersSchema = z.array(playerTransferSchema);

export const playerTransfersQuerySchema = sortingQuerySchema.extend({
  transfer_date: z.string().trim().optional(),
  transfer_fee: z.number().optional(),
  transfer_type: transferTypeSchema.optional(),
});
