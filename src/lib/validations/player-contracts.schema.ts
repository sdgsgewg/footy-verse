import { nullableDate } from "@/utils/date";
import { z } from "zod";

export const playerContractIdSchema = z.string().uuid();

export const playerContractMutationSchema = z.object({
  player_career_id: z.string().uuid(),
  contract_start: z.string(),
  contract_end: nullableDate.optional(),
  salary: z.number().min(0),
});

export const createPlayerContractSchema = playerContractMutationSchema;

export const updatePlayerContractSchema = playerContractMutationSchema;

export const playerContractSchema = playerContractMutationSchema.extend({
  id: playerContractIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerContractsSchema = z.array(playerContractSchema);
