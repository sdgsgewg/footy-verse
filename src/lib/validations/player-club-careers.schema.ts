import { z } from "zod";
import { playerContractMutationSchema } from "./player-contracts.schema";
import { playerShirtNumberMutationSchema } from "./player-shirt-numbers.schema";
import { playerTransferMutationSchema } from "./player-transfers.schema";
import { idSchema } from "./primitives.schema";
import { playerCareerMutationSchema } from "./player-careers.schema";

export const playerClubCareerMutationSchema = z.object({
  club_team_id: idSchema,
  player_career_id: idSchema.nullable().optional(),
  career: playerCareerMutationSchema,
  contracts: playerContractMutationSchema.array(),
  shirt_numbers: playerShirtNumberMutationSchema.array(),
  transfer: playerTransferMutationSchema,
});

export const createPlayerClubCareerSchema = playerClubCareerMutationSchema;

export const updatePlayerClubCareerSchema = playerClubCareerMutationSchema;

export const playerClubCareerSchema = playerClubCareerMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerClubCareersSchema = z.array(playerClubCareerSchema);
