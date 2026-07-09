import { PreferredFoot } from "@/enums/PreferredFoot";
import { z } from "zod";
import { playerPositionMutationSchema } from "./player-positions.schema";
import { playerCareerMutationSchema } from "./player-careers.schema";
import { playerNationalTeamMutationSchema } from "./player-national-teams.schema";

export const playerIdSchema = z.string().uuid();

export const playerMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  dob: z.string(),
  pob: z.string().min(1).max(255),
  player_positions: playerPositionMutationSchema.array(),
  preferred_foot: z.enum([
    PreferredFoot.RIGHT,
    PreferredFoot.LEFT,
    PreferredFoot.BOTH,
  ]),
  height: z.coerce.number().int().min(100).max(250),
  weight: z.coerce.number().positive(),
  market_value: z.coerce.number().positive(),
  player_careers: playerCareerMutationSchema.array().optional(),
  player_national_teams: playerNationalTeamMutationSchema.array().optional(),
});

export const createPlayerSchema = playerMutationSchema;

export const updatePlayerSchema = playerMutationSchema;

export const playerSchema = playerMutationSchema.extend({
  id: playerIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playersSchema = z.array(playerSchema);

export const playersQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
});
