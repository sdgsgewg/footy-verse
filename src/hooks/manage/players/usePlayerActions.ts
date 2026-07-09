import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDeletePlayer } from "./useDeletePlayer";
import { PlayerWithDetails } from "@/lib/repositories/players.repo";
import { ROUTES } from "@/constants/routes";

export function usePlayerActions() {
  const tPlayers = useTranslations("manage.players");

  const router = useRouter();
  const locale = useLocale();

  const deleteMutation = useDeletePlayer();

  const handleCreate = () => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.CREATE}`);
  };

  const handleView = (player: PlayerWithDetails) => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.BASE}/${player.id}`);
  };

  const handleEdit = (player: PlayerWithDetails) => {
    router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.EDIT}/${player.id}`);
  };

  const handleDelete = (player: PlayerWithDetails) => {
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
