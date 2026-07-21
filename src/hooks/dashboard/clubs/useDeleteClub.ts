import { deleteClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";

interface DeleteClubPayload {
  id: string;
  data: unknown;
}

export function useDeleteClub() {
  return useCrudMutation<DeleteClubPayload>({
    mutationFn: ({ id }) => deleteClub(id),

    invalidateQueries: [{ queryKey: clubKeys.lists() }],

    entityKey: "club",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
