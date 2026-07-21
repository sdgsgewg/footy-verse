import { deleteSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { seasonKeys } from "@/lib/react-query/keys/seasonKeys";

interface DeleteSeasonPayload {
  id: string;
  data: unknown;
}

export function useDeleteSeason() {
  return useCrudMutation<DeleteSeasonPayload>({
    mutationFn: ({ id }) => deleteSeason(id),

    invalidateQueries: [{ queryKey: seasonKeys.lists() }],

    entityKey: "season",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
