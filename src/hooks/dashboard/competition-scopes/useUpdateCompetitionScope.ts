import { updateCompetitionScope } from "@/lib/api/competition-scope";
import { useCrudMutation } from "../useCrudMutation";
import { competitionScopeKeys } from "@/lib/react-query/keys/competitionScopeKeys";

interface UpdateCompetitionScopePayload {
  id: string;
  data: unknown;
}

export function useUpdateCompetitionScope(onSuccess?: () => void) {
  return useCrudMutation<UpdateCompetitionScopePayload>({
    mutationFn: ({ id, data }) => updateCompetitionScope(id, data),

    invalidateQueries: [{ queryKey: competitionScopeKeys.lists() }],

    entityKey: "competitionScope",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
