import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { createPosition } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

export function useCreatePosition() {
  return useCrudMutation({
    mutationFn: createPosition,

    invalidateQueries: [{ queryKey: positionKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,

    entityKey: "position",

    action: "create",
  });
}
