import { deleteClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { clubKeys, clubTeamKeys } from "@/lib/react-query/keys";

interface DeleteClubPayload {
  id: string;
  data: unknown;
}

export function useDeleteClub() {
  return useCrudMutation<DeleteClubPayload>({
    mutationFn: ({ id }) => deleteClub(id),

    invalidateQueries: [
      { queryKey: clubKeys.lists() },

      { queryKey: clubTeamKeys.lists() },
    ],

    entityKey: "club",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
