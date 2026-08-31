import { updateRegion } from "@/lib/api/region";
import { useCrudMutation } from "../useCrudMutation";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";

interface UpdateRegionPayload {
  id: string;
  data: FormData;
}

export function useUpdateRegion() {
  return useCrudMutation<UpdateRegionPayload>({
    mutationFn: ({ id, data }) => updateRegion(id, data),

    invalidateQueries: [
      { queryKey: regionKeys.lists() },
      { queryKey: regionKeys.details() },
      { queryKey: regionKeys.edits() },
    ],

    entityKey: "region",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
