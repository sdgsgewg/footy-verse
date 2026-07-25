import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { NationalityListItem } from "@/types/nationality";
import { useTranslations } from "next-intl";
import { useDeleteNationality } from "./useDeleteNationality";

export function useNationalityActions() {
  const t = useTranslations("common");

  const router = useRouter();

  const deleteMutation = useDeleteNationality();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.CREATE}`);
  };

  const handleView = (nation: NationalityListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nation.slug}`);
  };

  const handleEdit = (nation: NationalityListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nation.slug}/edit`,
    );
  };

  const handleDelete = (nation: NationalityListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: nation.id,
      data: nation,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
