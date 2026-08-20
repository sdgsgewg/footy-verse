import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteRegion } from "./useDeleteRegion";
import { RegionListItem } from "@/types/region";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function useRegionActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteRegion();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.REGIONS.CREATE}`);
  };

  const handleView = (region: RegionListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.REGIONS.BASE}/${region.slug}`);
  };

  const handleEdit = (region: RegionListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.REGIONS.BASE}/${region.slug}/edit`);
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("region"),
    getVariables: (region: RegionListItem) => ({
      id: region.id,
      data: region,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
