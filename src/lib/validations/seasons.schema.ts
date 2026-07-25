import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { seasonSortBySchema } from "./enums.schema";

export const seasonMutationSchema = z.object({
  name: z.string().min(1).max(255),
});

export const createSeasonSchema = seasonMutationSchema;

export const updateSeasonSchema = seasonMutationSchema;

export const seasonSchema = seasonMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const seasonsSchema = z.array(seasonSchema);

export const seasonsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: seasonSortBySchema.default("name"),
  });
