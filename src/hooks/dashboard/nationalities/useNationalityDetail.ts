import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { fetchNationalityDetail } from "@/lib/api/nationality";

export function useNationalityDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: nationalityKeys.detail(id),
    queryFn: () => fetchNationalityDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    nationality: query.data ?? null,
  };
}
