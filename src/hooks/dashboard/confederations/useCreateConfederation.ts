import { createConfederation } from "@/lib/api/confederation";
import { useCrudMutation } from "../useCrudMutation";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";

export function useCreateConfederation() {
  return useCrudMutation({
    mutationFn: createConfederation,

    invalidateQueries: [{ queryKey: confederationKeys.lists() }],

    entityKey: "confederation",

    action: "create",
  });
}
