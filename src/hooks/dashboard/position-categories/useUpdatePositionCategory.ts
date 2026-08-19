import { useCrudMutation } from "../useCrudMutation";
import { updatePositionCategory } from "@/lib/api/position-category";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";

interface UpdatePositionCategoryPayload {
  id: string;
  data: unknown;
}

export function useUpdatePositionCategory(onSuccess?: () => void) {
  return useCrudMutation<UpdatePositionCategoryPayload>({
    mutationFn: ({ id, data }) => updatePositionCategory(id, data),

    invalidateQueries: [
      { queryKey: positionCategoryKeys.lists() },
      { queryKey: positionCategoryKeys.details() },
      { queryKey: positionCategoryKeys.edits() },
    ],

    // redirectTo: ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE,

    entityKey: "positionCategory",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
