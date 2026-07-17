import { createNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateNationality(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createNationality,

    queryKey: queryKeys.nationalities(),

    entityKey: "nationality",

    action: "create",

    onSuccess,
  });
}
