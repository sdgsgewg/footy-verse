import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerContractMutationSchema = z
  .object({
    player_club_team_career_id: idSchema.optional(),
    contract_start: z.string(),
    contract_end: z.string(),
    salary: z.number().nonnegative().min(0).nullable(),
  })
  .refine(
    ({ contract_start, contract_end }) =>
      contract_end || contract_start <= contract_end,
    {
      message: "Contract start must be less than or equal to contract end",
      path: ["contract_start"],
    },
  );

export const createPlayerContractSchema = playerContractMutationSchema;

export const updatePlayerContractSchema = playerContractMutationSchema;

export const playerContractSchema = playerContractMutationSchema.safeExtend({
  id: idSchema,
  player_club_team_career_id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerContractsSchema = z.array(playerContractSchema);
