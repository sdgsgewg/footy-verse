import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { positionCategorySortBySchema } from "./enums.schema";

export const positionCategoryMutationSchema = z.object({
  name: z.string().min(1).max(255),
});

export const createPositionCategorySchema = positionCategoryMutationSchema;

export const updatePositionCategorySchema = positionCategoryMutationSchema;

export const reorderPositionCategoriesSchema = z.object({
  position_category_ids: z.array(idSchema).min(1),
});

export const positionCategorySchema = positionCategoryMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const positionCategoriesSchema = z.array(positionCategorySchema);

export const positionCategoriesQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: positionCategorySortBySchema.default("name"),
  });
