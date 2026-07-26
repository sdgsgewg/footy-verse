// Repo Request (from zod)

import {
  createPlayerClubCareerSchema,
  playerClubCareerMutationSchema,
  updatePlayerClubCareerSchema,
} from "@/lib/validations/player-club-careers.schema";
import z from "zod";

export type PlayerClubCareerCreateInput = z.infer<
  typeof createPlayerClubCareerSchema
>;
export type PlayerClubCareerUpdateInput = z.infer<
  typeof updatePlayerClubCareerSchema
>;

// Mutation
export type UpsertPlayerClubCareerInput = z.infer<
  typeof playerClubCareerMutationSchema
> & {
  id?: string;
};
