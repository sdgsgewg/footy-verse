import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteCompetition } from "./useDeleteCompetition";
import { CompetitionListItem } from "@/types/competition";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function useCompetitionActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteCompetition();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.CREATE}`);
  };

  const handleView = (competition: CompetitionListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}/${competition.slug}`,
    );
  };

  const handleEdit = (competition: CompetitionListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}/${competition.slug}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("competition"),
    getVariables: (competition: CompetitionListItem) => ({
      id: competition.id,
      data: competition,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
