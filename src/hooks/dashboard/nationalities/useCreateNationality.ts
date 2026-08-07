import { createNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";

export function useCreateNationality() {
  return useCrudMutation({
    mutationFn: createNationality,

    invalidateQueries: [
      { queryKey: nationalityKeys.lists() },

      { queryKey: nationalTeamKeys.lists() },
    ],

    entityKey: "nationality",

    action: "create",
  });
}
