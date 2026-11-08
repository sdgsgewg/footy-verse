import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { ageGroupSchema, squadTypeSchema } from "./enums.schema";
import { SquadType } from "@/enums/SquadType";

export const clubTeamMutationSchema = z
  .object({
    squad_type: z.union([squadTypeSchema, z.literal("")]),
    age_group: z
      .union([ageGroupSchema, z.literal("")])
      .nullable()
      .optional(),
    club_id: idSchema.optional(),
  })
  .superRefine(({ squad_type, age_group }, ctx) => {
    if (squad_type === SquadType.ACADEMY) {
      if (!age_group) {
        ctx.addIssue({
          code: "custom",
          message: "Age group is required for Academy squad",
          path: ["age_group"],
        });
      }

      return;
    }

    if (age_group) {
      ctx.addIssue({
        code: "custom",
        message: "Age group is only allowed for Academy squad",
        path: ["age_group"],
      });
    }
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
