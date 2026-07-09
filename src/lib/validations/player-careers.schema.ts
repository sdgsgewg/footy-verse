import { nullableDate } from "@/utils/date";
import { z } from "zod";

export const playerCareerIdSchema = z.string().uuid();

export const playerCareerMutationSchema = z.object({
  club_id: z.string().uuid(),
  joined_at: z.string(),
  left_at: nullableDate.optional(),
  is_current: z.boolean().default(false),
});

export const createPlayerCareerSchema = playerCareerMutationSchema;

export const updatePlayerCareerSchema = playerCareerMutationSchema;

export const playerCareerSchema = playerCareerMutationSchema.extend({
  id: playerCareerIdSchema,
  player_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const playerCareersSchema = z.array(playerCareerSchema);
