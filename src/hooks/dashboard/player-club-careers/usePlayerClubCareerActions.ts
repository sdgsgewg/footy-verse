import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerClubCareer } from "./useDeletePlayerClubCareer";
import { PlayerClubCareerListItem } from "@/types/player-club-career";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { PlayerLookupResponse } from "@/types/player";

export function usePlayerClubCareerActions(playerLookup: PlayerLookupResponse) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerClubCareer(playerLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/club-careers/create`,
    );
  };

  const handleView = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/club-careers/${careerId}`,
    );
  };

  const handleEdit = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerLookup.slug}/club-careers/${careerId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("playerClubCareer"),
    getVariables: (pcc: PlayerClubCareerListItem) => ({
      playerClubCareerId: pcc.id,
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
