import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePosition } from "./useDeletePosition";
import { PositionListItem } from "@/types/position";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function usePositionActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeletePosition();

  const handleCreate = () => {
    router.push(ROUTES.DASHBOARD.CONTENT.POSITIONS.CREATE);
  };

  const handleReorder = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE}/reorder`);
  };

  const handleView = (position: PositionListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE}/${position.slug}`);
  };

  const handleEdit = (position: PositionListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE}/${position.slug}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("position"),
    getVariables: (position) => ({
      id: position.id,
      data: position,
    }),
  });

  return {
    handleCreate,
    handleReorder,
    handleView,
    handleEdit,
    handleDelete,
  };
}
