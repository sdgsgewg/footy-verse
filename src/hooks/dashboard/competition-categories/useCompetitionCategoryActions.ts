import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeleteCompetitionCategory } from "./useDeleteCompetitionCategory";
import { CompetitionCategoryListItem } from "@/types/competition-category";

export function useCompetitionCategoryActions() {
  const tEntities = useTranslations("entities");

  const deleteMutation = useDeleteCompetitionCategory();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("competitionCategory"),
    getVariables: (competitionCategory: CompetitionCategoryListItem) => ({
      id: competitionCategory.id,
      data: competitionCategory,
    }),
  });

  return {
    handleDelete,
  };
}
