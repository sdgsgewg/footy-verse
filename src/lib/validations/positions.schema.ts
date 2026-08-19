import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { positionSortBySchema } from "./enums.schema";

export const otherPositionMutationSchema = z.object({
  id: idSchema,
  display_order: z.coerce.number().int().min(1).max(99),
});

export const positionMutationSchema = z.object({
  name: z.string().min(1).max(255),
  position_category_id: idSchema,
  display_order: z.coerce.number().int().min(1).max(99),
  other_positions: otherPositionMutationSchema.array(),
});

export const createPositionSchema = positionMutationSchema;

export const updatePositionSchema = positionMutationSchema;

export const positionSchema = positionMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const positionsSchema = z.array(positionSchema);

export const positionsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    categoryId: idSchema.optional(),

    sortBy: positionSortBySchema.default("name"),
  });
