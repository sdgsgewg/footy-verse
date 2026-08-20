import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { NationalityListItem } from "@/types/nationality";
import { useTranslations } from "next-intl";
import { useDeleteNationality } from "./useDeleteNationality";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function useNationalityActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteNationality();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.CREATE}`);
  };

  const handleView = (nation: NationalityListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nation.slug}`,
    );
  };

  const handleEdit = (nation: NationalityListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nation.slug}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("nationality"),
    getVariables: (nation: NationalityListItem) => ({
      id: nation.id,
      data: nation,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
