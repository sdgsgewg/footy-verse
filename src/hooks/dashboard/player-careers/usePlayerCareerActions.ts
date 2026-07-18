import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerCareer } from "./useDeletePlayerCareer";
import { PlayerCareerDetailResponse } from "@/types/player-career";
import { PlayerCareer } from "@/types/player";

export function usePlayerCareerActions(playerId: string) {
  const tPlayerCareers = useTranslations("dashboard.playerCareers");

  const router = useRouter();

  const deleteMutation = useDeletePlayerCareer(playerId);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/careers/create`,
    );
  };

  const handleView = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/careers/${careerId}`,
    );
  };

  const handleEdit = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/careers/edit/${careerId}`,
    );
  };

  const handleDelete = (pc: PlayerCareer) => {
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
