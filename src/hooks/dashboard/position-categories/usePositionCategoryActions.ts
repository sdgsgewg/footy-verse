import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeletePositionCategory } from "./useDeletePositionCategory";
import { PositionCategoryListItem } from "@/types/position-category";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

export function usePositionCategoryActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePositionCategory();

  const handleReorder = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE}/reorder`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("positionCategory"),
    getVariables: (positionCategory: PositionCategoryListItem) => ({
      id: positionCategory.id,
      data: positionCategory,
    }),
  });

  return {
    handleReorder,
    handleDelete,
  };
}
