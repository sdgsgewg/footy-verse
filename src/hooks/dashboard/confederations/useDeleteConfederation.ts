import { deleteConfederation } from "@/lib/api/confederation";
import { useCrudMutation } from "../useCrudMutation";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";

interface DeleteConfederationPayload {
  id: string;
  data: unknown;
}

export function useDeleteConfederation() {
  return useCrudMutation<DeleteConfederationPayload>({
    mutationFn: ({ id }) => deleteConfederation(id),

    invalidateQueries: [{ queryKey: confederationKeys.lists() }],

    entityKey: "confederation",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
