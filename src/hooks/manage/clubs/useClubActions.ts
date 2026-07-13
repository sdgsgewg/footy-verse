import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDeleteClub } from "./useDeleteClub";
import { ROUTES } from "@/constants/routes";
import { ClubDetailResponse } from "@/types/club";

export function useClubActions() {
  const tClubs = useTranslations("manage.clubs");

  const router = useRouter();
  const locale = useLocale();

  const deleteMutation = useDeleteClub();

  const handleCreate = () => {
    router.push(`/${locale}/${ROUTES.MANAGE.CLUBS.CREATE}`);
  };

  const handleView = (club: ClubDetailResponse) => {
    router.push(`/${locale}/${ROUTES.MANAGE.CLUBS.BASE}/${club.id}`);
  };

  const handleEdit = (club: ClubDetailResponse) => {
    router.push(`/${locale}/${ROUTES.MANAGE.CLUBS.EDIT}/${club.id}`);
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
