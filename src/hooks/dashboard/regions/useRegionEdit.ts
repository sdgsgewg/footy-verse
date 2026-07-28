import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";
import { fetchRegionEdit } from "@/lib/api/region";

export function useRegionEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: regionKeys.edit(id),
    queryFn: () => fetchRegionEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    region: query.data ?? null,
  };
}
