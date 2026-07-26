import {
  createNationalTeamSchema,
  nationalTeamMutationSchema,
  nationalTeamsQuerySchema,
  updateNationalTeamSchema,
} from "@/lib/validations/national-teams.schema";
import z from "zod";

// Repo Request (from zod)

/**
 * Input dari client (dari URL / API route)
 */
export type NationalTeamQuery = Partial<
  z.input<typeof nationalTeamsQuerySchema>
>;

export type GetNationalTeamsParams = NationalTeamQuery;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */

export type NationalTeamsFilter = z.infer<typeof nationalTeamsQuerySchema>;

export type NationalTeamCreateInput = z.infer<typeof createNationalTeamSchema>;
export type NationalTeamUpdateInput = z.infer<typeof updateNationalTeamSchema>;

// Mutation
export type UpsertNationalTeamInput = z.infer<
  typeof nationalTeamMutationSchema
> & {
  id?: string;
};
