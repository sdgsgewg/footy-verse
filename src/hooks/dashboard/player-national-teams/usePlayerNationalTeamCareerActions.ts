import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerNationalTeamCareer } from "./useDeletePlayerNationalTeamCareer";
import { PlayerNationalTeamCareerListItem } from "@/types/player-national-team-career";

export function usePlayerNationalTeamCareerActions(playerId: string) {
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerNationalTeamCareer(playerId);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/national-teams/create`,
    );
  };

  const handleView = (nationalTeamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/national-teams/${nationalTeamId}`,
    );
  };

  const handleEdit = (nationalTeamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/national-teams/${nationalTeamId}/edit`,
    );
  };

  const handleDelete = (pnt: PlayerNationalTeamCareerListItem) => {
    if (
      !confirm(
        `${tCommon("crud.confirm.delete", {
          entity: tEntities("playerNationalTeamCareer").toLowerCase(),
        })}`,
      )
    )
      return;

    deleteMutation.mutate({
      nationalTeamId: pnt.id,
      data: pnt,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
