import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerNationalTeam } from "./useDeletePlayerNationalTeam";
import { PlayerNationalTeamListItem } from "@/types/player-national-teams";

export function usePlayerNationalTeamActions(playerId: string) {
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerNationalTeam(playerId);

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

  const handleDelete = (pnt: PlayerNationalTeamListItem) => {
    if (
      !confirm(
        `${tCommon("crud.confirm.delete", {
          entity: tEntities("playerNationalTeam").toLowerCase(),
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
