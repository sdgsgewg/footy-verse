import { z } from "zod";

export const seasonIdSchema = z.string().uuid();

const seasonMutationSchema = z.object({
  name: z.string().min(1).max(255),
});

export const createSeasonSchema = seasonMutationSchema;

export const updateSeasonSchema = seasonMutationSchema;

export const seasonSchema = seasonMutationSchema.extend({
  id: seasonIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const seasonsSchema = z.array(seasonSchema);

export const seasonsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
});
