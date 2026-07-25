import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";
import { fetchPositionCategoryDetail } from "@/lib/api/position-category";

export function usePositionCategoryDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: positionCategoryKeys.detail(id),
    queryFn: () => fetchPositionCategoryDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    positionCategory: query.data ?? null,
  };
}
