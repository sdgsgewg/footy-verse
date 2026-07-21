import { updateSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { seasonKeys } from "@/lib/react-query/keys/seasonKeys";

interface UpdateSeasonPayload {
  id: string;
  data: unknown;
}

export function useUpdateSeason(onSuccess?: () => void) {
  return useCrudMutation<UpdateSeasonPayload>({
    mutationFn: ({ id, data }) => updateSeason(id, data),

    invalidateQueries: [{ queryKey: seasonKeys.lists() }],

    entityKey: "season",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
