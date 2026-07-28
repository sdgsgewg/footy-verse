import { useCrudMutation } from "../useCrudMutation";
import { updateCompetitionCategory } from "@/lib/api/competition-category";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";

interface UpdateCompetitionCategoryPayload {
  id: string;
  data: unknown;
}

export function useUpdateCompetitionCategory(onSuccess?: () => void) {
  return useCrudMutation<UpdateCompetitionCategoryPayload>({
    mutationFn: ({ id, data }) => updateCompetitionCategory(id, data),

    invalidateQueries: [{ queryKey: positionCategoryKeys.lists() }],

    entityKey: "competitionCategory",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
