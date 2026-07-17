import { useTranslations } from "next-intl";
import { useDeletePlayer } from "./useDeletePlayer";
import { ROUTES } from "@/constants/routes";
import { PlayerDetailResponse } from "@/types/player";
import { useRouter } from "@/navigation";

export function usePlayerActions() {
  const tPlayers = useTranslations("dashboard.players");

  const router = useRouter();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.CREATE}`);
  };

  const handleView = (player: PlayerDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.id}`);
  };

  const handleEdit = (player: PlayerDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.EDIT}/${player.id}`);
  };

  const handleDelete = (player: PlayerDetailResponse) => {
    if (!confirm(`${tPlayers("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: player.id,
      data: player,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
