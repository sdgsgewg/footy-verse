import { z } from "zod";

export const nationalityIdSchema = z.string().uuid();

export const nationalityMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
});

export const createNationalitySchema = nationalityMutationSchema;

export const updateNationalitySchema = nationalityMutationSchema;

export const nationalitySchema = nationalityMutationSchema.extend({
  id: nationalityIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const nationalitiesSchema = z.array(nationalitySchema);

export const nationalitiesQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
});
