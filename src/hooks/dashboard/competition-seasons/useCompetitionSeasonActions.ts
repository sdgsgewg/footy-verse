import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeleteCompetitionSeason } from "./useDeleteCompetitionSeason";
import { CompetitionSeasonListItem } from "@/types/competition-season";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { CompetitionLookupResponse } from "@/types/competition";

export function useCompetitionSeasonActions(
  competitionLookup: CompetitionLookupResponse,
) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteCompetitionSeason(competitionLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}/${competitionLookup.slug}/seasons/create`,
    );
  };

  const handleView = (competitionSeasonId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}/${competitionLookup.slug}/seasons/${competitionSeasonId}`,
    );
  };

  const handleEdit = (competitionSeasonId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}/${competitionLookup.slug}/seasons/${competitionSeasonId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("competitionSeason"),
    getVariables: (competitionSeason: CompetitionSeasonListItem) => ({
      competitionSeasonId: competitionSeason.id,
      data: competitionSeason,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
