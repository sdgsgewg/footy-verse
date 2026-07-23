import { NationalityLookupResponse } from "@/types/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { createNationalTeam } from "@/lib/api/national-team";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";

interface CreateNationalTeamPayload {
  data: unknown;
}

export function useCreateNationalTeam(nation: NationalityLookupResponse) {
  return useCrudMutation<CreateNationalTeamPayload>({
    mutationFn: ({ data }) => createNationalTeam(nation.id, data),

    invalidateQueries: [{ queryKey: nationalTeamKeys.lists() }],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nation.slug}`,

    entityKey: "nationalTeam",

    action: "create",
  });
}
