import { createCompetitionSeason } from "@/lib/api/competition-season";
import { useCrudMutation } from "../useCrudMutation";
import { competitionKeys, competitionSeasonKeys } from "@/lib/react-query/keys";
import { CompetitionLookupResponse } from "@/types/competition";

interface CreateCompetitionSeasonPayload {
  data: unknown;
}

export function useCreateCompetitionSeason(
  competition: CompetitionLookupResponse,
) {
  return useCrudMutation<CreateCompetitionSeasonPayload>({
    mutationFn: ({ data }) => createCompetitionSeason(competition.id, data),

    invalidateQueries: [
      { queryKey: competitionSeasonKeys.lists() },

      { queryKey: competitionKeys.lists() },
      { queryKey: competitionKeys.details() },
    ],

    entityKey: "competitionSeason",

    action: "create",
  });
}
