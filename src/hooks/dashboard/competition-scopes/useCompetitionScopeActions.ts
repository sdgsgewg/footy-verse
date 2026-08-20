import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { CompetitionScopeListItem } from "@/types/competition-scope";
import { useDeleteCompetitionScope } from "./useDeleteCompetitionScope";

export function useCompetitionScopeActions() {
  const tEntities = useTranslations("entities");

  const deleteMutation = useDeleteCompetitionScope();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("competitionScope"),
    getVariables: (competitionScope: CompetitionScopeListItem) => ({
      id: competitionScope.id,
      data: competitionScope,
    }),
  });

  return {
    handleDelete,
  };
}
