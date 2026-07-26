import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerClubCareer } from "./useDeletePlayerClubCareer";
import { PlayerClubCareerListItem } from "@/types/player-club-career";

export function usePlayerClubCareerActions(playerSlug: string) {
  const t = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerClubCareer(playerSlug);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/club-careers/create`,
    );
  };

  const handleView = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/club-careers/${careerId}`,
    );
  };

  const handleEdit = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/club-careers/${careerId}/edit`,
    );
  };

  const handleDelete = (pc: PlayerClubCareerListItem) => {
    if (
      !confirm(
        `${t("crud.confirm.delete", {
          entity: tEntities("playerClubCareer").toLowerCase(),
        })}`,
      )
    )
      return;

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
