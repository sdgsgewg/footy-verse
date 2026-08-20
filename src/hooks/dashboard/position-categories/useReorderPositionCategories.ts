import { useCrudMutation } from "../useCrudMutation";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";
import { reorderPositionCategories } from "@/lib/api/position-category";

interface ReorderPositionCategoriesPayload {
  data: unknown;
}

export function useReorderPositionCategories() {
  return useCrudMutation<ReorderPositionCategoriesPayload>({
    mutationFn: ({ data }) => reorderPositionCategories(data),

    invalidateQueries: [{ queryKey: positionCategoryKeys.lists() }],

    entityKey: "positionCategory",

    action: "reorder",

    getPayload: ({ data }) => data,
  });
}
