import { updateClubTeam } from "@/lib/api/club-team";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { ClubLookupResponse } from "@/types/club";

interface UpdateClubTeamPayload {
  teamId: string;
  data: unknown;
}

export function useUpdateClubTeam(club: ClubLookupResponse) {
  return useCrudMutation<UpdateClubTeamPayload>({
    mutationFn: ({ teamId, data }) => updateClubTeam(club.id, teamId, data),

    invalidateQueries: [
      { queryKey: clubTeamKeys.lists() },
      { queryKey: clubTeamKeys.details() },
      { queryKey: clubTeamKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`,

    entityKey: "clubTeam",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
