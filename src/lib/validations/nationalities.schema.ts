import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { listQuerySchema } from "./query.schema";
import { nationalitySortBySchema } from "./enums.schema";
import { imageSchema } from "./primitives.schema";

export const nationalityMutationSchema = z.object({
  image: imageSchema,
  name: z.string().trim().min(1).max(255),
  fifa_code: z
    .string()
    .trim()
    .regex(/^[A-Z]{3}$/, "FIFA code must be 3 uppercase letters"),
  confederation_id: idSchema,
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
  confederationId: idSchema.optional(),

  sortBy: nationalitySortBySchema.default("name"),
});
