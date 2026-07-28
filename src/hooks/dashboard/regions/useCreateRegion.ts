import { createRegion } from "@/lib/api/region";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";

export function useCreateRegion() {
  return useCrudMutation({
    mutationFn: createRegion,

    invalidateQueries: [{ queryKey: regionKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.REGIONS.BASE,

    entityKey: "region",

    action: "create",
  });
}
