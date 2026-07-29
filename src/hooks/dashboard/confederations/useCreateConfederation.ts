import { createConfederation } from "@/lib/api/confederation";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";

export function useCreateConfederation() {
  return useCrudMutation({
    mutationFn: createConfederation,

    invalidateQueries: [{ queryKey: confederationKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE,

    entityKey: "confederation",

    action: "create",
  });
}
