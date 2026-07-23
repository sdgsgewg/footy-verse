import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { ageGroupSchema, teamCategorySchema } from "./enums.schema";

export const nationalTeamMutationSchema = z.object({
  team_category: teamCategorySchema,
  age_group: ageGroupSchema,
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
  teamCategory: teamCategorySchema.optional(),

  ageGroup: ageGroupSchema.optional(),

  nationId: idSchema.optional(),
});
