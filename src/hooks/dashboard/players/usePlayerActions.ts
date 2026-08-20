import { ROUTES } from "@/constants/routes";
import { useDeletePlayer } from "./useDeletePlayer";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { PlayerListItem } from "@/types/player";

interface UsePlayerActionsOptions {
  returnTo?: string;
}

export function usePlayerActions({ returnTo }: UsePlayerActionsOptions = {}) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(ROUTES.DASHBOARD.CONTENT.PLAYERS.CREATE);
  };

  const handleView = (player: PlayerListItem) => {
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

  const handleEdit = (player: PlayerListItem) => {
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

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("player"),
    getVariables: (player: PlayerListItem) => ({
      id: player.id,
      data: player,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
