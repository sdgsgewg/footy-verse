import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerCareer } from "./useDeletePlayerCareer";
import { PlayerCareerDetailResponse } from "@/types/player-career";

export function usePlayerCareerActions(playerId: string, careerId: string) {
  const tPlayerCareers = useTranslations("dashboard.playerCareers");

  const router = useRouter();

  const deleteMutation = useDeletePlayerCareer(playerId);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/careers/create`,
    );
  };

  const handleView = (player: PlayerCareerDetailResponse) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.id}/careers/${careerId}`,
    );
  };

  const handleEdit = (player: PlayerCareerDetailResponse) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.id}/careers/edit/${careerId}`,
    );
  };

  const handleDelete = (pc: PlayerCareerDetailResponse) => {
    if (!confirm(`${tPlayerCareers("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      careerId: pc.id,
      data: pc,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
