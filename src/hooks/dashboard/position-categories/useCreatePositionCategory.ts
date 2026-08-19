import { useCrudMutation } from "../useCrudMutation";
import { createPositionCategory } from "@/lib/api/position-category";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";

export function useCreatePositionCategory(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createPositionCategory,

    invalidateQueries: [{ queryKey: positionCategoryKeys.lists() }],

    // redirectTo: ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE,

    entityKey: "positionCategory",

    action: "create",

    onSuccess,
  });
}
