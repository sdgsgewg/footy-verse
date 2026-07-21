import { useCrudMutation } from "../useCrudMutation";
import { updatePosition } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

interface UpdatePositionPayload {
  id: string;
  data: unknown;
}

export function useUpdatePosition(onSuccess?: () => void) {
  return useCrudMutation<UpdatePositionPayload>({
    mutationFn: ({ id, data }) => updatePosition(id, data),

    invalidateQueries: [{ queryKey: positionKeys.lists() }],

    entityKey: "position",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
