import { deleteCompetitionScope } from "@/lib/api/competition-scope";
import { useCrudMutation } from "../useCrudMutation";
import { competitionScopeKeys } from "@/lib/react-query/keys/competitionScopeKeys";

interface DeleteCompetitionScopePayload {
  id: string;
  data: unknown;
}

export function useDeleteCompetitionScope() {
  return useCrudMutation<DeleteCompetitionScopePayload>({
    mutationFn: ({ id }) => deleteCompetitionScope(id),

    invalidateQueries: [{ queryKey: competitionScopeKeys.lists() }],

    entityKey: "competitionScope",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
