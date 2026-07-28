import { deleteCompetitionCategory } from "@/lib/api/competition-category";
import { useCrudMutation } from "../useCrudMutation";
import { competitionCategoryKeys } from "@/lib/react-query/keys/competitionCategoryKeys";

interface DeleteCompetitionCategoryPayload {
  id: string;
  data: unknown;
}

export function useDeleteCompetitionCategory() {
  return useCrudMutation<DeleteCompetitionCategoryPayload>({
    mutationFn: ({ id }) => deleteCompetitionCategory(id),

    invalidateQueries: [{ queryKey: competitionCategoryKeys.lists() }],

    entityKey: "competitionCategory",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
