// Repo Request (from zod)

import {
  createPlayerClubTeamCareerSchema,
  playerClubTeamCareerMutationSchema,
  updatePlayerClubTeamCareerSchema,
} from "@/lib/validations/player-club-team-careers.schema";
import z from "zod";

export type PlayerClubTeamCareerCreateInput = z.infer<
  typeof createPlayerClubTeamCareerSchema
>;
export type PlayerClubTeamCareerUpdateInput = z.infer<
  typeof updatePlayerClubTeamCareerSchema
>;

// Mutation
export type UpsertPlayerClubTeamCareerInput = z.infer<
  typeof playerClubTeamCareerMutationSchema
> & {
  id?: string;
};
