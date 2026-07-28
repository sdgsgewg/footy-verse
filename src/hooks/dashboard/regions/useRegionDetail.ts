import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";
import { fetchRegionDetail } from "@/lib/api/region";

export function useRegionDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: regionKeys.detail(id),
    queryFn: () => fetchRegionDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    region: query.data ?? null,
  };
}
