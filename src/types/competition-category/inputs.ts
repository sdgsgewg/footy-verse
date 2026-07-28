import {
  competitionCategoriesQuerySchema,
  competitionCategoryMutationSchema,
  createCompetitionCategorySchema,
  updateCompetitionCategorySchema,
} from "@/lib/validations/competition-categories.schema";
import z from "zod";

export type CompetitionCategoryQuery = Partial<
  z.input<typeof competitionCategoriesQuerySchema>
>;
export type CompetitionCategoryFilter = z.infer<
  typeof competitionCategoriesQuerySchema
>;

export type CompetitionCategoryCreateInput = z.infer<
  typeof createCompetitionCategorySchema
>;
export type CompetitionCategoryUpdateInput = z.infer<
  typeof updateCompetitionCategorySchema
>;

// Mutation

export type UpsertCompetitionCategoryInput = z.infer<
  typeof competitionCategoryMutationSchema
> & {
  id?: string;
};
