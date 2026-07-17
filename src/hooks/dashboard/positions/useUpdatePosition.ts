import { useCrudMutation } from "../useCrudMutation";
import { updatePosition } from "@/lib/api/position";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdatePositionPayload {
  id: string;
  data: unknown;
}

export function useUpdatePosition(onSuccess?: () => void) {
  return useCrudMutation<UpdatePositionPayload>({
    mutationFn: ({ id, data }) => updatePosition(id, data),

    queryKey: queryKeys.positions(),

    entityKey: "position",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
