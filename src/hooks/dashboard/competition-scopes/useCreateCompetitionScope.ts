import { createCompetitionScope } from "@/lib/api/competition-scope";
import { useCrudMutation } from "../useCrudMutation";
import { competitionScopeKeys } from "@/lib/react-query/keys/competitionScopeKeys";

export function useCreateCompetitionScope(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createCompetitionScope,

    invalidateQueries: [{ queryKey: competitionScopeKeys.lists() }],

    entityKey: "competitionScope",

    action: "create",

    onSuccess,
  });
}
