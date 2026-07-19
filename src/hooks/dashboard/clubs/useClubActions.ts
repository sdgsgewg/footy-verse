import { useTranslations } from "next-intl";
import { useDeleteClub } from "./useDeleteClub";
import { ROUTES } from "@/constants/routes";
import { ClubDetailResponse } from "@/types/club";
import { useRouter } from "@/navigation";

export function useClubActions() {
  const tClubs = useTranslations("dashboard.clubs");

  const router = useRouter();

  const deleteMutation = useDeleteClub();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.CREATE}`);
  };

  const handleView = (club: ClubDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`);
  };

  const handleEdit = (club: ClubDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.EDIT}/${club.slug}`);
  };

  const handleDelete = (club: ClubDetailResponse) => {
    if (!confirm(`${tClubs("form.confirm.delete")}`)) return;

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
