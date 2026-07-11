import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDeletePlayer } from "./useDeletePlayer";
import { ROUTES } from "@/constants/routes";
import { PlayerDetailResponse } from "@/types/player";

export function usePlayerActions() {
  const tPlayers = useTranslations("manage.players");

  const router = useRouter();
  const locale = useLocale();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.CREATE}`);
  };

  const handleView = (player: PlayerDetailResponse) => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.BASE}/${player.id}`);
  };

  const handleEdit = (player: PlayerDetailResponse) => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.EDIT}/${player.id}`);
  };

  const handleDelete = (player: PlayerDetailResponse) => {
    if (!confirm(`${tPlayers("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: player.id,
      name: player.name,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
