import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerClubTeamCareer } from "./useDeletePlayerClubTeamCareer";
import { PlayerClubTeamCareerListItem } from "@/types/player-club-team-career";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { PlayerLookupResponse } from "@/types/player";

export function usePlayerClubTeamCareerActions(
  playerLookup: PlayerLookupResponse,
) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const clubTeamCareerBaseRoute = "club-team-careers";

  const deleteMutation = useDeletePlayerClubTeamCareer(playerLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/${clubTeamCareerBaseRoute}/create`,
    );
  };

  const handleView = (playerClubTeamCareerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/${clubTeamCareerBaseRoute}/${playerClubTeamCareerId}`,
    );
  };

  const handleEdit = (playerClubTeamCareerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/${clubTeamCareerBaseRoute}/${playerClubTeamCareerId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("playerClubTeamCareer"),
    getVariables: (pcc: PlayerClubTeamCareerListItem) => ({
      playerClubTeamCareerId: pcc.id,
      data: pcc,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
