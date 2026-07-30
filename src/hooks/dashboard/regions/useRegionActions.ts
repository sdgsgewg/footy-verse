import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useDeleteRegion } from "./useDeleteRegion";
import { RegionListItem } from "@/types/region";

export function useRegionActions() {
  const t = useTranslations("common");

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

  const handleDelete = (region: RegionListItem) => {
    if (!confirm(`${t("crud.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: region.id,
      data: region,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
