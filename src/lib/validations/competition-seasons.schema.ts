import { z } from "zod";

import { idSchema, nullableIdSchema } from "./primitives.schema";

import { baseQuerySchema, sortingQuerySchema } from "./query.schema";

import {
  competitionSeasonStatusSchema,
  competitionSortBySchema,
} from "./enums.schema";
import { nullableDate } from "./helpers";

export const competitionSeasonMutationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Competition season name is required")
    .max(255),
  season_label: z.string().trim().min(1, "Season label is required").max(255),
  start_date: z.string(),
  end_date: nullableDate.optional(),
  status: z.union([competitionSeasonStatusSchema, z.literal("")]),
  winner_club_team_id: nullableIdSchema,
  winner_national_team_id: nullableIdSchema,
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
