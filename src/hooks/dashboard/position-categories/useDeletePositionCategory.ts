import { deletePositionCategory } from "@/lib/api/position-category";
import { useCrudMutation } from "../useCrudMutation";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";

interface DeletePositionCategoryPayload {
  id: string;
  data: unknown;
}

export function useDeletePositionCategory() {
  return useCrudMutation<DeletePositionCategoryPayload>({
    mutationFn: ({ id }) => deletePositionCategory(id),

    invalidateQueries: [{ queryKey: positionCategoryKeys.lists() }],

    entityKey: "positionCategory",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
