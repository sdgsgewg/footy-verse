import { z } from "zod";

import { createPlayerNationalTeamCareerSchema } from "./player-national-team-careers.schema";

export const playerNationalTeamCareerFormSchema = z.object({
  careers: createPlayerNationalTeamCareerSchema,
});

export type PlayerNationalTeamCareerFormValues = z.infer<
  typeof playerNationalTeamCareerFormSchema
>;
