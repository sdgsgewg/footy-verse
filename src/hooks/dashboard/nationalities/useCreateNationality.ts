import { createNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { ROUTES } from "@/constants/routes";

export function useCreateNationality() {
  return useCrudMutation({
    mutationFn: createNationality,

    invalidateQueries: [{ queryKey: nationalityKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,

    entityKey: "nationality",

    action: "create",
  });
}
