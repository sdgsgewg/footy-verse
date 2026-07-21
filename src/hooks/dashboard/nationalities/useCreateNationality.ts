import { createNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";

export function useCreateNationality(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createNationality,

    invalidateQueries: [{ queryKey: nationalityKeys.lists() }],

    entityKey: "nationality",

    action: "create",

    onSuccess,
  });
}
