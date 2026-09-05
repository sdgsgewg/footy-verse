import { z } from "zod";

import {
  idSchema,
  nullableIdSchema,
  imageSchema,
  slugSchema,
} from "./primitives.schema";

import { listQuerySchema } from "./query.schema";

import {
  ageGroupSchema,
  competitionSortBySchema,
  genderSchema,
  participantTypeSchema,
} from "./enums.schema";

export const competitionMutationSchema = z.object({
  // Basic Information
  name: z.string().trim().min(1, "Competition name is required").max(255),

  short_name: z.string().trim().min(1, "Short name is required").max(20),

  description: z.string().trim().max(255).nullable().optional(),

  founded_year: z.coerce.number().int().min(1800).max(new Date().getFullYear()),

  // Competition Classification
  gender: z.union([genderSchema, z.literal("")]),

  age_group: z.union([ageGroupSchema, z.literal("")]),

  participant_type: z.union([participantTypeSchema, z.literal("")]),

  competition_category_id: idSchema,

  // Scope & Location
  competition_scope_id: idSchema,

  confederation_id: nullableIdSchema,

  nationality_id: nullableIdSchema,

  region_id: nullableIdSchema,

  // Media
  image: imageSchema,
});

export const createCompetitionSchema = competitionMutationSchema;

export const updateCompetitionSchema = competitionMutationSchema;

export const competitionSchema = competitionMutationSchema.extend({
  id: idSchema,

  slug: slugSchema,

  created_at: z.string(),

  updated_at: z.string().nullable(),
});

export const competitionsSchema = z.array(competitionSchema);

export const competitionsQuerySchema = listQuerySchema.extend({
  categoryId: idSchema.optional(),
  scopeId: idSchema.optional(),

  participantType: participantTypeSchema.optional(),
  gender: genderSchema.optional(),

  sortBy: competitionSortBySchema.default("name"),
});
