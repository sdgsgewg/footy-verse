import {
  createPositionCategorySchema,
  positionCategoriesQuerySchema,
  positionCategoryMutationSchema,
  updatePositionCategorySchema,
} from "@/lib/validations/position-categories.schema";
import z from "zod";

export type PositionCategoryQuery = Partial<
  z.input<typeof positionCategoriesQuerySchema>
>;
export type PositionCategoryFilter = z.infer<
  typeof positionCategoriesQuerySchema
>;

export type PositionCategoryCreateInput = z.infer<
  typeof createPositionCategorySchema
>;
export type PositionCategoryUpdateInput = z.infer<
  typeof updatePositionCategorySchema
>;

// Mutation

export type UpsertPositionCategoryInput = z.infer<
  typeof positionCategoryMutationSchema
> & {
  id?: string;
};
