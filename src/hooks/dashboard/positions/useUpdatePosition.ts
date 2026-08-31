import { useCrudMutation } from "../useCrudMutation";
import { updatePosition } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

interface UpdatePositionPayload {
  id: string;
  data: unknown;
}

export function useUpdatePosition() {
  return useCrudMutation<UpdatePositionPayload>({
    mutationFn: ({ id, data }) => updatePosition(id, data),

    invalidateQueries: [
      { queryKey: positionKeys.lists() },
      { queryKey: positionKeys.details() },
      { queryKey: positionKeys.edits() },
    ],

    entityKey: "position",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
