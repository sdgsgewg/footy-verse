import { deleteNationalTeam } from "@/lib/api/national-team";
import { useCrudMutation } from "../useCrudMutation";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";

interface DeleteNationalTeamPayload {
  teamId: string;
  data: unknown;
}

export function useDeleteNationalTeam(clubId: string) {
  return useCrudMutation<DeleteNationalTeamPayload>({
    mutationFn: ({ teamId }) => deleteNationalTeam(clubId, teamId),

    invalidateQueries: [{ queryKey: nationalTeamKeys.lists() }],

    entityKey: "nationalTeam",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
