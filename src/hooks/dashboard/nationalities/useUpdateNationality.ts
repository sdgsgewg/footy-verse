import { updateNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { ROUTES } from "@/constants/routes";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";

interface UpdateNationalityPayload {
  id: string;
  data: unknown;
}

export function useUpdateNationality() {
  return useCrudMutation<UpdateNationalityPayload>({
    mutationFn: ({ id, data }) => updateNationality(id, data),

    invalidateQueries: [
      { queryKey: nationalityKeys.lists() },
      { queryKey: nationalityKeys.details() },
      { queryKey: nationalityKeys.edits() },

      { queryKey: nationalTeamKeys.lists() },
    ],

    redirectTo: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,

    entityKey: "nationality",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
