import { deleteRegion } from "@/lib/api/region";
import { useCrudMutation } from "../useCrudMutation";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";

interface DeleteRegionPayload {
  id: string;
  data: unknown;
}

export function useDeleteRegion() {
  return useCrudMutation<DeleteRegionPayload>({
    mutationFn: ({ id }) => deleteRegion(id),

    invalidateQueries: [{ queryKey: regionKeys.lists() }],

    entityKey: "region",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
