import { useCrudMutation } from "../useCrudMutation";
import { createPosition } from "@/lib/api/position";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreatePosition(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createPosition,

    queryKey: queryKeys.positions(),

    entityKey: "position",

    action: "create",

    onSuccess,
  });
}
