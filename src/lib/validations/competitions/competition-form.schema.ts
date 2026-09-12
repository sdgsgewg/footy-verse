import { z } from "zod";

import { idSchema, nullableIdSchema } from "../primitives.schema";
import { imageFileSchema } from "../image.schema";
import {
  ageGroupSchema,
  genderSchema,
  participantTypeSchema,
} from "../enums.schema";

export const competitionFormSchema = z.object({
  // Media
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),

  // Basic Information
  name: z.string().trim().min(1, "Competition name is required").max(255),

  short_name: z.string().trim().min(1, "Short name is required").max(20),

  description: z.string().trim().max(255).nullable().optional(),

  founded_year: z.number().int().min(1800).max(new Date().getFullYear()),

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
});

export type CompetitionFormValues = z.infer<typeof competitionFormSchema>;
