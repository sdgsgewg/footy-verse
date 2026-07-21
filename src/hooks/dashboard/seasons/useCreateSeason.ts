import { createSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { seasonKeys } from "@/lib/react-query/keys/seasonKeys";

export function useCreateSeason(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createSeason,

    invalidateQueries: [{ queryKey: seasonKeys.lists() }],

    entityKey: "season",

    action: "create",

    onSuccess,
  });
}
