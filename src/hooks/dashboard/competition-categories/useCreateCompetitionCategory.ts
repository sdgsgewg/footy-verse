import { useCrudMutation } from "../useCrudMutation";
import { competitionCategoryKeys } from "@/lib/react-query/keys/competitionCategoryKeys";
import { createCompetitionCategory } from "@/lib/api/competition-category";

export function useCreateCompetitionCategory(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createCompetitionCategory,

    invalidateQueries: [{ queryKey: competitionCategoryKeys.lists() }],

    entityKey: "competitionCategory",

    action: "create",

    onSuccess,
  });
}
