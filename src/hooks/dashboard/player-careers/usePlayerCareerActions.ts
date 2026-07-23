import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePlayerCareer } from "./useDeletePlayerCareer";
import { PlayerCareerListItem } from "@/types/player-career";

export function usePlayerCareerActions(playerSlug: string) {
  const t = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePlayerCareer(playerSlug);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/careers/create`,
    );
  };

  const handleView = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/careers/${careerId}`,
    );
  };

  const handleEdit = (careerId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/careers/${careerId}/edit`,
    );
  };

  const handleDelete = (pc: PlayerCareerListItem) => {
    if (
      !confirm(
        `${t("crud.confirm.delete", {
          entity: tEntities("playerCareer").toLowerCase(),
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
