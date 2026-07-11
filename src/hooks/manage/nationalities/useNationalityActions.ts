import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { ClubDetailResponse } from "@/types/club";
import { useDeleteNationality } from "./useDeleteNationality";

export function useClubActions() {
  const tNationalities = useTranslations("manage.nationalities");

  const router = useRouter();
  const locale = useLocale();

  const deleteMutation = useDeleteNationality();

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
    if (!confirm(`${tNationalities("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: club.id,
      name: club.name,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
