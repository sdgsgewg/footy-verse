import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeletePositionCategory } from "./useDeletePositionCategory";
import { PositionCategoryListItem } from "@/types/position-category";

export function usePositionCategoryActions() {
  const tEntities = useTranslations("entities");

  const deleteMutation = useDeletePositionCategory();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("positionCategory"),
    getVariables: (positionCategory: PositionCategoryListItem) => ({
      id: positionCategory.id,
      data: positionCategory,
    }),
  });

  return {
    handleDelete,
  };
}
