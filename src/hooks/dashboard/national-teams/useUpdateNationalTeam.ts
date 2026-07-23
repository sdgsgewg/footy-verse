import { NationalityLookupResponse } from "@/types/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";
import { updateNationalTeam } from "@/lib/api/national-team";

interface UpdateNationalTeamPayload {
  teamId: string;
  data: unknown;
}

export function useUpdateNationalTeam(nation: NationalityLookupResponse) {
  return useCrudMutation<UpdateNationalTeamPayload>({
    mutationFn: ({ teamId, data }) =>
      updateNationalTeam(nation.id, teamId, data),

    invalidateQueries: [
      { queryKey: nationalTeamKeys.lists() },
      { queryKey: nationalTeamKeys.details() },
      { queryKey: nationalTeamKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nation.slug}`,

    entityKey: "nationalTeam",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
