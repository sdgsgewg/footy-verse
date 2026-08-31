import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerContractMutationSchema = z.object({
  player_club_team_career_id: idSchema.optional(),
  contract_start: z.string(),
  contract_end: z.string(),
  salary: z.number().nonnegative().min(0).nullable(),
});

export const createPlayerContractSchema = playerContractMutationSchema;

export const updatePlayerContractSchema = playerContractMutationSchema;

export const playerContractSchema = playerContractMutationSchema.extend({
  id: idSchema,
  player_club_team_career_id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerContractsSchema = z.array(playerContractSchema);
