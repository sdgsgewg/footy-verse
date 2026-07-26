import {
  createPlayerNationalTeamCareerSchema,
  playerNationalTeamCareerMutationSchema,
  updatePlayerNationalTeamCareerSchema,
} from "@/lib/validations/player-national-team-careers.schema";
import z from "zod";

// Repo Request (from zod)

export type PlayerNationalTeamCareerCreateInput = z.infer<
  typeof createPlayerNationalTeamCareerSchema
>;
export type PlayerNationalTeamCareerUpdateInput = z.infer<
  typeof updatePlayerNationalTeamCareerSchema
>;

// Mutation

export type UpsertPlayerNationalTeamCareerInput = z.infer<
  typeof playerNationalTeamCareerMutationSchema
> & {
  id?: string;
};
