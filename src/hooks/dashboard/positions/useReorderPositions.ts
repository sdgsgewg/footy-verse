import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { reorderPositions } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";

interface ReorderPositionsPayload {
  data: unknown;
}

export function useReorderPositions() {
  return useCrudMutation<ReorderPositionsPayload>({
    mutationFn: ({ data }) => reorderPositions(data),

    invalidateQueries: [{ queryKey: positionKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,

    entityKey: "position",

    action: "reorder",

    getPayload: ({ data }) => data,
  });
}
