import {
  clubTeamMutationSchema,
  clubTeamsQuerySchema,
  createClubTeamSchema,
  updateClubTeamSchema,
} from "@/lib/validations/club-teams.schema";
import z from "zod";

// Repo Request (from zod)

/**
 * Input dari client (dari URL / API route)
 */
export type ClubTeamQuery = Partial<z.input<typeof clubTeamsQuerySchema>>;

export type GetClubTeamsParams = ClubTeamQuery;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type ClubTeamFilter = z.infer<typeof clubTeamsQuerySchema>;

export type ClubTeamCreateInput = z.infer<typeof createClubTeamSchema>;
export type ClubTeamUpdateInput = z.infer<typeof updateClubTeamSchema>;

// Mutation

export type UpsertClubTeamInput = z.infer<typeof clubTeamMutationSchema> & {
  id?: string;
};
