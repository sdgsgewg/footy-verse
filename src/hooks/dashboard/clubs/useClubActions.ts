import { useTranslations } from "next-intl";
import { useDeleteClub } from "./useDeleteClub";
import { ROUTES } from "@/constants/routes";
import { ClubListItem } from "@/types/club";
import { useRouter } from "@/navigation";

export function useClubActions() {
  const t = useTranslations("common");

  const router = useRouter();

  const deleteMutation = useDeleteClub();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.CREATE}`);
  };

  const handleView = (club: ClubListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`);
  };

  const handleEdit = (club: ClubListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS}/${club.slug}/edit`);
  };

  const handleDelete = (club: ClubListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: club.id,
      data: club,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
