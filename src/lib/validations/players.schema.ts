import { z } from "zod";
import { playerPositionMutationSchema } from "./player-positions.schema";
import { idSchema } from "./primitives.schema";
import { prefFootSchema, sortOrderSchema } from "./enums.schema";
import { playerNationalityMutationSchema } from "./player-nationalities.schema";

export const playerMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  dob: z.string(),
  pob: z.string().min(1).max(255),
  preferred_foot: prefFootSchema,
  height: z.coerce.number().int().min(100).max(250),
  weight: z.coerce.number().positive(),
  market_value: z.coerce.number().positive(),
  positions: playerPositionMutationSchema.array(),
  nationalities: playerNationalityMutationSchema.array(),
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
  name: z.string().trim().optional(),

  nationId: idSchema.optional(),

  clubTeamId: idSchema.optional(),

  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(20),

  sortBy: z.enum(["name", "market_value", "dob", "created_at"]).default("name"),

  sortOrder: sortOrderSchema,
});
