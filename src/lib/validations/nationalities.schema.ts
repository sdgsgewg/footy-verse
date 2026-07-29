import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { listQuerySchema } from "./query.schema";
import { nationalitySortBySchema } from "./enums.schema";

export const nationalityMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  fifa_code: z.string().min(1).max(3),
  confederation_id: z.string().nullable().optional(),
});

export const createNationalitySchema = nationalityMutationSchema;

export const updateNationalitySchema = nationalityMutationSchema;

export const nationalitySchema = nationalityMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const nationalitiesSchema = z.array(nationalitySchema);

export const nationalitiesQuerySchema = listQuerySchema.extend({
  sortBy: nationalitySortBySchema.default("name"),
});
