import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";

export const playerNationalTeamIdSchema = z.string().uuid();

export const playerNationalTeamMutationSchema = z.object({
  nation_id: z.string().uuid(),
  label: z.string(),
  start_date: z.string(),
  end_date: nullableDate.optional(),
  shirt_number: z.number().int().min(1).max(99),
});

export const createPlayerNationalTeamSchema = playerNationalTeamMutationSchema;

export const updatePlayerNationalTeamSchema = playerNationalTeamMutationSchema;

export const playerNationalTeamSchema = playerNationalTeamMutationSchema.extend(
  {
    id: playerNationalTeamIdSchema,
    player_id: z.string().uuid(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
  },
);

export const playerNationalitiesSchema = z.array(playerNationalTeamSchema);
