import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteConfederation } from "./useDeleteConfederation";
import { ConfederationListItem } from "@/types/confederation";

export function useConfederationActions() {
  const t = useTranslations("common");

  const router = useRouter();

  const deleteMutation = useDeleteConfederation();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.CREATE}`);
  };

  const handleView = (Confederation: ConfederationListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS}/${Confederation.slug}`,
    );
  };

  const handleEdit = (Confederation: ConfederationListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE}/${Confederation.slug}/edit`,
    );
  };

  const handleDelete = (confederation: ConfederationListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: confederation.id,
      data: confederation,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
