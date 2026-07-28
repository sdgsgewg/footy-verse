import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { baseQuerySchema, sortingQuerySchema } from "./query.schema";
import { competitionScopeSortBySchema } from "./enums.schema";

export const competitionScopeMutationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
});

export const createCompetitionScopeSchema = competitionScopeMutationSchema;

export const updateCompetitionScopeSchema = competitionScopeMutationSchema;

export const competitionScopeSchema = competitionScopeMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const competitionScopesSchema = z.array(competitionScopeSchema);

export const competitionScopesQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: competitionScopeSortBySchema.default("name"),
  });
