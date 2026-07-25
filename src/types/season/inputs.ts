import {
  createSeasonSchema,
  seasonMutationSchema,
  seasonsQuerySchema,
  updateSeasonSchema,
} from "@/lib/validations/seasons.schema";
import z from "zod";

// Repo Request (from zod)

export type SeasonQuery = Partial<z.input<typeof seasonsQuerySchema>>;
export type SeasonFilter = z.infer<typeof seasonsQuerySchema>;

export type SeasonCreateInput = z.infer<typeof createSeasonSchema>;
export type SeasonUpdateInput = z.infer<typeof updateSeasonSchema>;

// Mutation
export type UpsertSeasonInput = z.infer<typeof seasonMutationSchema> & {
  id?: string;
};
