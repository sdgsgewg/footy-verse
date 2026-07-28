import { competitionCategoryKeys } from "@/lib/react-query/keys/competitionCategoryKeys";
import { useCrudMutation } from "../useCrudMutation";
import { updateCompetitionCategory } from "@/lib/api/competition-category";

interface UpdateCompetitionCategoryPayload {
  id: string;
  data: unknown;
}

export function useUpdateCompetitionCategory(onSuccess?: () => void) {
  return useCrudMutation<UpdateCompetitionCategoryPayload>({
    mutationFn: ({ id, data }) => updateCompetitionCategory(id, data),

    invalidateQueries: [{ queryKey: competitionCategoryKeys.lists() }],

    entityKey: "competitionCategory",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
