import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";
import { idSchema } from "./primitives.schema";
import { careerTypeSchema } from "./enums.schema";

export const playerCareerMutationSchema = z.object({
  joined_at: z.string(),
  left_at: nullableDate.optional(),
});

export const createPlayerCareerSchema = playerCareerMutationSchema;

export const updatePlayerCareerSchema = playerCareerMutationSchema;

export const playerCareerSchema = playerCareerMutationSchema.extend({
  id: idSchema,
  player_id: idSchema,
  career_type: careerTypeSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerCareersSchema = z.array(playerCareerSchema);
