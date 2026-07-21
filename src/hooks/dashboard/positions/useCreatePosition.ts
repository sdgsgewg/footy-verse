import { useCrudMutation } from "../useCrudMutation";
import { createPosition } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

export function useCreatePosition(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createPosition,

    invalidateQueries: [{ queryKey: positionKeys.lists() }],

    entityKey: "position",

    action: "create",

    onSuccess,
  });
}
