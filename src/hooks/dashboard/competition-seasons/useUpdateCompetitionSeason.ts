import { updateCompetitionSeason } from "@/lib/api/competition-season";
import { useCrudMutation } from "../useCrudMutation";
import { competitionKeys, competitionSeasonKeys } from "@/lib/react-query/keys";
import { CompetitionLookupResponse } from "@/types/competition";

interface UpdateCompetitionSeasonPayload {
  competitionSeasonId: string;
  data: unknown;
}

export function useUpdateCompetitionSeason(
  competition: CompetitionLookupResponse,
) {
  return useCrudMutation<UpdateCompetitionSeasonPayload>({
    mutationFn: ({ competitionSeasonId, data }) =>
      updateCompetitionSeason(competition.id, competitionSeasonId, data),

    invalidateQueries: [
      { queryKey: competitionSeasonKeys.lists() },
      { queryKey: competitionSeasonKeys.details() },
      { queryKey: competitionSeasonKeys.edits() },

      { queryKey: competitionKeys.lists() },
      { queryKey: competitionKeys.details() },
    ],

    entityKey: "competitionSeason",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
