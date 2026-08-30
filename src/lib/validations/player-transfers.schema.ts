import { z } from "zod";
import { idSchema } from "./primitives.schema";
import {
  playerTransferSortBySchema,
  sortOrderSchema,
  transferTypeSchema,
} from "./enums.schema";

export const playerTransferMutationSchema = z.object({
  player_club_team_career_id: idSchema.optional(),
  season_id: idSchema,
  from_club_team_id: idSchema,
  to_club_team_id: idSchema,
  transfer_type: transferTypeSchema,
  transfer_fee: z
    .number()
    .nonnegative()
    .nullable()
    .refine((value) => value !== null, {
      message: "Transfer fee is required",
    }),
  transfer_date: z.string(),
});

export const createPlayerTransferSchema = playerTransferMutationSchema;

export const updatePlayerTransferSchema = playerTransferMutationSchema;

export const playerTransferSchema = playerTransferMutationSchema.extend({
  id: idSchema,
  player_club_team_career_id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerTransfersSchema = z.array(playerTransferSchema);

export const playerTransfersQuerySchema = z.object({
  transferDate: z.string().trim().optional(),
  transferFee: z.number().optional(),
  transferType: transferTypeSchema.optional(),
  sortBy: playerTransferSortBySchema.default("transfer_date"),
  sortOrder: sortOrderSchema.default("desc"),
});
