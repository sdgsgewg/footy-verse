import { updateConfederation } from "@/lib/api/confederation";
import { useCrudMutation } from "../useCrudMutation";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";

interface UpdateConfederationPayload {
  id: string;
  data: unknown;
}

export function useUpdateConfederation() {
  return useCrudMutation<UpdateConfederationPayload>({
    mutationFn: ({ id, data }) => updateConfederation(id, data),

    invalidateQueries: [
      { queryKey: confederationKeys.lists() },
      { queryKey: confederationKeys.details() },
      { queryKey: confederationKeys.edits() },
    ],

    entityKey: "confederation",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
