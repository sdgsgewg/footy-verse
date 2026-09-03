import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { ageGroupSchema, squadTypeSchema } from "./enums.schema";

export const clubTeamMutationSchema = z.object({
  squad_type: z.union([squadTypeSchema, z.literal("")]),
  age_group: z
    .union([ageGroupSchema, z.literal("")])
    .nullable()
    .optional(),
  club_id: idSchema.optional(),
});

export const createClubTeamSchema = clubTeamMutationSchema;

export const updateClubTeamSchema = clubTeamMutationSchema;

export const clubTeamSchema = clubTeamMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const clubTeamsSchema = z.array(clubTeamSchema);

export const clubTeamsQuerySchema = z.object({
  squadType: squadTypeSchema.optional(),

  ageGroup: ageGroupSchema.optional(),

  clubId: idSchema.optional(),
});
