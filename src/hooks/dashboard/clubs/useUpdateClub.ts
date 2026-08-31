import { updateClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { clubKeys, clubTeamKeys } from "@/lib/react-query/keys";

interface UpdateClubPayload {
  id: string;
  data: FormData;
}

export function useUpdateClub() {
  return useCrudMutation<UpdateClubPayload>({
    mutationFn: ({ id, data }) => updateClub(id, data),

    invalidateQueries: [
      { queryKey: clubKeys.lists() },
      { queryKey: clubKeys.details() },
      { queryKey: clubKeys.edits() },

      { queryKey: clubTeamKeys.lists() },
    ],

    entityKey: "club",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
