import z from "zod";
import { ImagePayload } from "../image";
import {
  competitionMutationSchema,
  competitionsQuerySchema,
  createCompetitionSchema,
  updateCompetitionSchema,
} from "@/lib/validations/competitions.schema";

// Repo Request (from zod)

export type CompetitionQuery = Partial<z.input<typeof competitionsQuerySchema>>;
export type CompetitionFilter = z.infer<typeof competitionsQuerySchema>;

export type CompetitionCreateInput = z.infer<typeof createCompetitionSchema>;
export type CompetitionUpdateInput = z.infer<typeof updateCompetitionSchema>;

// Mutation

export type UpsertCompetitionInput = z.infer<
  typeof competitionMutationSchema
> & {
  id?: string;
} & ImagePayload;
