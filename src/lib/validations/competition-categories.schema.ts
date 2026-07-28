import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { competitionCategorySortBySchema } from "./enums.schema";

export const competitionCategoryMutationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
});

export const createCompetitionCategorySchema =
  competitionCategoryMutationSchema;

export const updateCompetitionCategorySchema =
  competitionCategoryMutationSchema;

export const competitionCategorySchema =
  competitionCategoryMutationSchema.extend({
    id: idSchema,
    slug: slugSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
  });

export const competitionCategoriesSchema = z.array(competitionCategorySchema);

export const competitionCategoriesQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: competitionCategorySortBySchema.default("name"),
  });
