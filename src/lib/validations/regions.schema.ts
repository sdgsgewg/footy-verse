import { z } from "zod";
import { idSchema, nullableIdSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { regionSortBySchema, regionTypeSchema } from "./enums.schema";
import { imageSchema } from "./primitives.schema";

export const regionMutationSchema = z.object({
  image: imageSchema,
  name: z.string().min(1).max(255),
  region_type: regionTypeSchema,
  parent_region_id: nullableIdSchema,
});

export const createRegionSchema = regionMutationSchema;

export const updateRegionSchema = regionMutationSchema;

export const regionSchema = regionMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const regionsSchema = z.array(regionSchema);

export const regionsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: regionSortBySchema.default("name"),
  });
