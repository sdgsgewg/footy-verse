import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerNationalTeamCareer } from "./useDeletePlayerNationalTeamCareer";
import { PlayerNationalTeamCareerListItem } from "@/types/player-national-team-career";
import { PlayerLookupResponse } from "@/types/player";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function usePlayerNationalTeamCareerActions(
  playerLookup: PlayerLookupResponse,
) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerNationalTeamCareer(playerLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/national-team-careers/create`,
    );
  };

  const handleView = (nationalTeamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/national-team-careers/${nationalTeamId}`,
    );
  };

  const handleEdit = (nationalTeamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/national-team-careers/${nationalTeamId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("playerNationalTeamCareer"),
    getVariables: (pntc: PlayerNationalTeamCareerListItem) => ({
      playerNationalTeamCareerId: pntc.id,
      data: pntc,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
