import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteCompetition } from "./useDeleteCompetition";
import { CompetitionListItem } from "@/types/competition";

export function useCompetitionActions() {
  const t = useTranslations("common");

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

  const handleDelete = (competition: CompetitionListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: competition.id,
      data: competition,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
