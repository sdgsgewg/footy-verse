import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";
import { fetchConfederationDetail } from "@/lib/api/confederation";

export function useConfederationDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: confederationKeys.detail(id),
    queryFn: () => fetchConfederationDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    confederation: query.data ?? null,
  };
}
