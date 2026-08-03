import { updateClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";

interface UpdateClubPayload {
  id: string;
  data: unknown;
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

    redirectTo: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,

    entityKey: "club",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
