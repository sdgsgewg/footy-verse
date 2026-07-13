import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";
import { playerContractMutationSchema } from "./player-contracts.schema";
import { playerShirtNumberMutationSchema } from "./player-shirt-numbers.schema";
import { transferMutationSchema } from "./transfers.schema";

export const playerCareerIdSchema = z.string().uuid();

export const playerCareerMutationSchema = z.object({
  club_id: z.string().uuid(),
  joined_at: z.string(),
  left_at: nullableDate.optional(),
  contracts: playerContractMutationSchema.array(),
  shirt_numbers: playerShirtNumberMutationSchema.array(),
  transfer: transferMutationSchema,
});

export const createPlayerCareerSchema = playerCareerMutationSchema;

export const updatePlayerCareerSchema = playerCareerMutationSchema;

export const playerCareerSchema = playerCareerMutationSchema.extend({
  id: playerCareerIdSchema,
  player_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerCareersSchema = z.array(playerCareerSchema);
