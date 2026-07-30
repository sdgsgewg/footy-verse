import { deleteCompetition } from "@/lib/api/competition";
import { useCrudMutation } from "../useCrudMutation";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";

interface DeleteCompetitionPayload {
  id: string;
  data: unknown;
}

export function useDeleteCompetition() {
  return useCrudMutation<DeleteCompetitionPayload>({
    mutationFn: ({ id }) => deleteCompetition(id),

    invalidateQueries: [{ queryKey: competitionKeys.lists() }],

    entityKey: "competition",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
