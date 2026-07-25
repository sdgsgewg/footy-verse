import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";
import { fetchPositionDetail } from "@/lib/api/position";

export function usePositionDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: positionKeys.detail(id),
    queryFn: () => fetchPositionDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    position: query.data ?? null,
  };
}
