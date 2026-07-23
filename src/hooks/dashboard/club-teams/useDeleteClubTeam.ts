import { deleteClubTeam } from "@/lib/api/club-team";
import { useCrudMutation } from "../useCrudMutation";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";

interface DeleteClubTeamPayload {
  teamId: string;
  data: unknown;
}

export function useDeleteClubTeam(clubId: string) {
  return useCrudMutation<DeleteClubTeamPayload>({
    mutationFn: ({ teamId }) => deleteClubTeam(clubId, teamId),

    invalidateQueries: [{ queryKey: clubTeamKeys.lists() }],

    entityKey: "clubTeam",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
