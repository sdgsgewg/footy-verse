import {
  competitionScopeMutationSchema,
  competitionScopesQuerySchema,
  createCompetitionScopeSchema,
  updateCompetitionScopeSchema,
} from "@/lib/validations/competition-scopes.schema";
import z from "zod";

export type CompetitionScopeQuery = Partial<
  z.input<typeof competitionScopesQuerySchema>
>;
export type CompetitionScopeFilter = z.infer<
  typeof competitionScopesQuerySchema
>;

export type CompetitionScopeCreateInput = z.infer<
  typeof createCompetitionScopeSchema
>;
export type CompetitionScopeUpdateInput = z.infer<
  typeof updateCompetitionScopeSchema
>;

// Mutation

export type UpsertCompetitionScopeInput = z.infer<
  typeof competitionScopeMutationSchema
> & {
  id?: string;
};
