import { createSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateSeason(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createSeason,

    queryKey: queryKeys.seasons(),

    entityKey: "season",

    action: "create",

    onSuccess,
  });
}
