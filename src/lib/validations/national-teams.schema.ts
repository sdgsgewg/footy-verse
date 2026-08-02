import { z } from "zod";
import { idSchema } from "./primitives.schema";
import {
  ageGroupSchema,
  genderSchema,
  nationalTeamTypeSchema,
} from "./enums.schema";

export const nationalTeamMutationSchema = z.object({
  gender: z.union([genderSchema, z.literal("")]),
  age_group: z.union([ageGroupSchema, z.literal("")]),
  team_type: z.union([nationalTeamTypeSchema, z.literal("")]),
  nation_id: idSchema.optional(),
});

export const createNationalTeamSchema = nationalTeamMutationSchema;

export const updateNationalTeamSchema = nationalTeamMutationSchema;

export const nationalTeamSchema = nationalTeamMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const nationalTeamsSchema = z.array(nationalTeamSchema);

export const nationalTeamsQuerySchema = z.object({
  gender: genderSchema.optional(),

  ageGroup: ageGroupSchema.optional(),

  teamType: nationalTeamTypeSchema.optional(),

  nationId: idSchema.optional(),
});
