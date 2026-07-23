import { PreferredFoot } from "@/enums/PreferredFoot";
import { z } from "zod";
import { playerPositionMutationSchema } from "./player-positions.schema";
import { idSchema } from "./primitives.schema";

export const playerMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  dob: z.string(),
  pob: z.string().min(1).max(255),
  positions: playerPositionMutationSchema.array(),
  preferred_foot: z.enum([
    PreferredFoot.RIGHT,
    PreferredFoot.LEFT,
    PreferredFoot.BOTH,
  ]),
  height: z.coerce.number().int().min(100).max(250),
  weight: z.coerce.number().positive(),
  market_value: z.coerce.number().positive(),
});

export const createPlayerSchema = playerMutationSchema;

export const updatePlayerSchema = playerMutationSchema;

export const playerSchema = playerMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playersSchema = z.array(playerSchema);

export const playersQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),

  nationId: idSchema.optional(),

  clubId: idSchema.optional(),
});
