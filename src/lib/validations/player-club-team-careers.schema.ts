import { z } from "zod";
import { playerContractMutationSchema } from "./player-contracts.schema";
import { playerShirtNumberMutationSchema } from "./player-shirt-numbers.schema";
import { playerTransferMutationSchema } from "./player-transfers.schema";
import { idSchema } from "./primitives.schema";
import { playerCareerMutationSchema } from "./player-careers.schema";

export const playerClubTeamCareerMutationSchema = z.object({
  club_team_id: idSchema,
  player_career_id: z.string().nullable().optional(),
  career: playerCareerMutationSchema,
  contracts: playerContractMutationSchema.array().optional(),
  shirt_numbers: playerShirtNumberMutationSchema.array().optional(),
  transfer: playerTransferMutationSchema,
});

export const createPlayerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema;

export const updatePlayerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema;

export const playerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema.extend({
    id: idSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
  });

export const playerClubTeamCareersSchema = z.array(playerClubTeamCareerSchema);
