import { nullableDate } from "@/lib/validations/helpers";
import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const playerNationalTeamMutationSchema = z.object({
  national_team_id: idSchema,
  start_date: z.string(),
  end_date: nullableDate.optional(),
  shirt_number: z.number().int().min(1).max(99),
});

export const createPlayerNationalTeamSchema =
  playerNationalTeamMutationSchema.array();

export const updatePlayerNationalTeamSchema = playerNationalTeamMutationSchema;

export const playerNationalTeamSchema = playerNationalTeamMutationSchema.extend(
  {
    id: idSchema,
    player_id: idSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
  },
);

export const playerNationalitiesSchema = z.array(playerNationalTeamSchema);
