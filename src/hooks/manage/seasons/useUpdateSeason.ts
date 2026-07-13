import { updateSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdateSeasonPayload {
  id: string;
  data: unknown;
}

export function useUpdateSeason(onSuccess?: () => void) {
  return useCrudMutation<UpdateSeasonPayload>({
    mutationFn: ({ id, data }) => updateSeason(id, data),

    queryKey: queryKeys.seasons(),

    entityKey: "season",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
