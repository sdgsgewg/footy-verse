import { z } from "zod";

import { idSchema, nullableIdSchema } from "./primitives.schema";

import { baseQuerySchema, sortingQuerySchema } from "./query.schema";

import { competitionSortBySchema } from "./enums.schema";

export const competitionSeasonMutationSchema = z
  .object({
    name: z.string().trim().nullable().optional(),
    season_label: z.string().trim().min(1, "Season label is required").max(255),
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    winner_club_team_id: nullableIdSchema,
    winner_national_team_id: nullableIdSchema,
  })
  .refine(({ start_date, end_date }) => start_date <= end_date, {
    message: "Start date must be less than or equal to end date",
    path: ["start_date"],
  });

export const createCompetitionSeasonSchema = competitionSeasonMutationSchema;

export const updateCompetitionSeasonSchema = competitionSeasonMutationSchema;

export const competitionSeasonSchema = competitionSeasonMutationSchema.extend({
  id: idSchema,

  created_at: z.string(),

  updated_at: z.string().nullable(),
});

export const competitionSeasonsSchema = z.array(competitionSeasonSchema);

export const competitionSeasonsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: competitionSortBySchema.default("name"),
  });
