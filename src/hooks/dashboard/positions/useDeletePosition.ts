import { useCrudMutation } from "../useCrudMutation";
import { deletePosition } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

interface DeletePositionPayload {
  id: string;
  data: unknown;
}

export function useDeletePosition() {
  return useCrudMutation<DeletePositionPayload>({
    mutationFn: ({ id }) => deletePosition(id),

    invalidateQueries: [{ queryKey: positionKeys.lists() }],

    entityKey: "position",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
