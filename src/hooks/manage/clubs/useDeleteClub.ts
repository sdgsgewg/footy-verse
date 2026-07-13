import { deleteClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeleteClubPayload {
  id: string;
  data: unknown;
}

export function useDeleteClub() {
  return useCrudMutation<DeleteClubPayload>({
    mutationFn: ({ id }) => deleteClub(id),

    queryKey: queryKeys.clubs(),

    entityKey: "club",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
