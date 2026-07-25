import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeletePosition } from "./useDeletePosition";
import { PositionListItem } from "@/types/position";

export function usePositionActions() {
  const t = useTranslations("common");

  const router = useRouter();

  const deleteMutation = useDeletePosition();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.POSITIONS.CREATE}`);
  };

  const handleView = (position: PositionListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE}/${position.slug}`);
  };

  const handleEdit = (position: PositionListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE}/${position.slug}/edit`,
    );
  };

  const handleDelete = (position: PositionListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: position.id,
      data: position,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
