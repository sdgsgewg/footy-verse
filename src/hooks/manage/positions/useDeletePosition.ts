import { useCrudMutation } from "../useCrudMutation";
import { deletePosition } from "@/lib/api/position";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeletePositionPayload {
  id: string;
  data: unknown;
}

export function useDeletePosition() {
  return useCrudMutation<DeletePositionPayload>({
    mutationFn: ({ id }) => deletePosition(id),

    queryKey: queryKeys.positions(),

    entityKey: "position",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
