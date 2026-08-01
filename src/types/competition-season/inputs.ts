import {
  competitionSeasonMutationSchema,
  competitionSeasonsQuerySchema,
  createCompetitionSeasonSchema,
  updateCompetitionSeasonSchema,
} from "@/lib/validations/competition-seasons.schema";
import z from "zod";

// Repo Request (from zod)

export type CompetitionSeasonQuery = Partial<
  z.input<typeof competitionSeasonsQuerySchema>
>;
export type CompetitionSeasonFilter = z.infer<
  typeof competitionSeasonsQuerySchema
>;

export type CompetitionSeasonCreateInput = z.infer<
  typeof createCompetitionSeasonSchema
>;
export type CompetitionSeasonUpdateInput = z.infer<
  typeof updateCompetitionSeasonSchema
>;

// Mutation

export type UpsertCompetitionSeasonInput = z.infer<
  typeof competitionSeasonMutationSchema
> & {
  id?: string;
};
