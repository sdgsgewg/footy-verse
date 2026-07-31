import { ROUTES } from "@/constants/routes";
import { useDeletePlayer } from "./useDeletePlayer";
import { PlayerDetailResponse, PlayerListItem } from "@/types/player";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

type PlayerActionItem = PlayerListItem | PlayerDetailResponse;

interface UsePlayerActionsOptions {
  returnTo?: string;
}

export function usePlayerActions({ returnTo }: UsePlayerActionsOptions = {}) {
  const tPlayers = useTranslations("dashboard.players");

  const router = useRouter();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(ROUTES.DASHBOARD.CONTENT.PLAYERS.CREATE);
  };

  const handleView = (player: PlayerActionItem) => {
    const playerHref = `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`;

    if (!returnTo) {
      router.push(playerHref);
      return;
    }

    const params = new URLSearchParams({
      returnTo,
    });

    router.push(`${playerHref}?${params.toString()}`);
  };

  const handleEdit = (player: PlayerActionItem) => {
    const playerHref = `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}/edit`;

    if (!returnTo) {
      router.push(playerHref);
      return;
    }

    const params = new URLSearchParams({
      returnTo,
    });

    router.push(`${playerHref}?${params.toString()}`);
  };

  const handleDelete = (player: PlayerActionItem) => {
    if (!confirm(tPlayers("form.confirm.delete"))) {
      return;
    }

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
