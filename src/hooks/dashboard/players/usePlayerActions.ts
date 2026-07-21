import { useTranslations } from "next-intl";
import { useDeletePlayer } from "./useDeletePlayer";
import { ROUTES } from "@/constants/routes";
import { PlayerDetailResponse, PlayerListItem } from "@/types/player";
import { useRouter } from "@/navigation";

export function usePlayerActions() {
  const tPlayers = useTranslations("dashboard.players");

  const router = useRouter();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.CREATE}`);
  };

  const handleView = (player: PlayerListItem | PlayerDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`);
  };

  const handleEdit = (player: PlayerListItem | PlayerDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.EDIT}/${player.slug}`);
  };

  const handleDelete = (player: PlayerListItem | PlayerDetailResponse) => {
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
