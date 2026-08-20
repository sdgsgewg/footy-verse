import { deleteNationalTeam } from "@/lib/api/national-team";
import { useCrudMutation } from "../useCrudMutation";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";

interface DeleteNationalTeamPayload {
  teamId: string;
  data: unknown;
}

export function useDeleteNationalTeam(nationId: string) {
  return useCrudMutation<DeleteNationalTeamPayload>({
    mutationFn: ({ teamId }) => deleteNationalTeam(nationId, teamId),

    invalidateQueries: [{ queryKey: nationalTeamKeys.lists() }],

    entityKey: "nationalTeam",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
