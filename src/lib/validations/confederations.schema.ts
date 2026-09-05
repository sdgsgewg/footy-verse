import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { confederationSortBySchema } from "./enums.schema";
import { nullableDate } from "./helpers";
import { imageSchema } from "./primitives.schema";

export const confederationMutationSchema = z.object({
  image: imageSchema,
  name: z.string().min(1).max(255),
  short_name: z.string().min(1).max(20),
  region_id: idSchema,
  founded: nullableDate.optional(),
  headquarters: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
});

export const createConfederationSchema = confederationMutationSchema;

export const updateConfederationSchema = confederationMutationSchema;

export const confederationSchema = confederationMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const confederationsSchema = z.array(confederationSchema);

export const confederationsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: confederationSortBySchema.default("name"),
  });
