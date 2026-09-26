import { deleteCompetitionSeason } from "@/lib/api/competition-season";
import { useCrudMutation } from "../useCrudMutation";
import { competitionSeasonKeys } from "@/lib/react-query/keys";

interface DeleteCompetitionSeasonPayload {
  competitionSeasonId: string;
  data: unknown;
}

export function useDeleteCompetitionSeason(competitionId: string) {
  return useCrudMutation<DeleteCompetitionSeasonPayload>({
    mutationFn: ({ competitionSeasonId }) =>
      deleteCompetitionSeason(competitionId, competitionSeasonId),

    invalidateQueries: [{ queryKey: competitionSeasonKeys.lists() }],

    entityKey: "competitionSeason",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
