import { deleteSeason } from "@/lib/api/season";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeleteSeasonPayload {
  id: string;
  data: unknown;
}

export function useDeleteSeason() {
  return useCrudMutation<DeleteSeasonPayload>({
    mutationFn: ({ id }) => deleteSeason(id),

    queryKey: queryKeys.seasons(),

    entityKey: "season",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
