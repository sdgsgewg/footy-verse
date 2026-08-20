import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteConfederation } from "./useDeleteConfederation";
import { ConfederationListItem } from "@/types/confederation";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function useConfederationActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteConfederation();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.CREATE}`);
  };

  const handleView = (Confederation: ConfederationListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE}/${Confederation.slug}`,
    );
  };

  const handleEdit = (Confederation: ConfederationListItem) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE}/${Confederation.slug}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("confederation"),
    getVariables: (confederation: ConfederationListItem) => ({
      id: confederation.id,
      data: confederation,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
