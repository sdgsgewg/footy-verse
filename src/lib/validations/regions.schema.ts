import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { regionSortBySchema, regionTypeSchema } from "./enums.schema";

export const regionMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  region_type: regionTypeSchema,
  parent_region_id: z.string().nullable().optional(),
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
