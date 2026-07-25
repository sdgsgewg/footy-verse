import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePositionCategory } from "./useDeletePositionCategory";
import { PositionCategoryListItem } from "@/types/position-category";

export function usePositionCategoryActions() {
  const t = useTranslations("common");

  const router = useRouter();

  const deleteMutation = useDeletePositionCategory();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.CREATE}`);
  };

  const handleView = (pc: PositionCategoryListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE}/${pc.slug}`,
    );
  };

  const handleEdit = (pc: PositionCategoryListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE}/${pc.slug}/edit`,
    );
  };

  const handleDelete = (pc: PositionCategoryListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: pc.id,
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
