import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { playerCareerMutationSchema } from "./player-careers.schema";
import { playerShirtNumberMutationSchema } from "./player-shirt-numbers.schema";

export const playerNationalTeamCareerMutationSchema = z.object({
  national_team_id: idSchema,
  player_career_id: idSchema.nullable().optional(),
  career: playerCareerMutationSchema,
  shirt_numbers: playerShirtNumberMutationSchema.array(),
});

export const createPlayerNationalTeamCareerSchema =
  playerNationalTeamCareerMutationSchema.array();

export const updatePlayerNationalTeamCareerSchema =
  playerNationalTeamCareerMutationSchema;

export const playerNationalTeamCareerSchema =
  playerNationalTeamCareerMutationSchema.extend({
    id: idSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
  });

export const playerNationalitiesSchema = z.array(
  playerNationalTeamCareerSchema,
);
