import { createCompetition } from "@/lib/api/competition";
import { useCrudMutation } from "../useCrudMutation";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";

export function useCreateCompetition() {
  return useCrudMutation({
    mutationFn: createCompetition,

    invalidateQueries: [{ queryKey: competitionKeys.lists() }],

    entityKey: "competition",

    action: "create",
  });
}
