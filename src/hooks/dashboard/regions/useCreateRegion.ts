import { createRegion } from "@/lib/api/region";
import { useCrudMutation } from "../useCrudMutation";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";

export function useCreateRegion() {
  return useCrudMutation({
    mutationFn: createRegion,

    invalidateQueries: [{ queryKey: regionKeys.lists() }],

    entityKey: "region",

    action: "create",
  });
}
