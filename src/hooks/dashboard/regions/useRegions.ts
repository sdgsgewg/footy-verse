import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { RegionQuery } from "@/types/region";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";
import { fetchRegions } from "@/lib/api/region";

export function useRegions(params?: RegionQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: regionKeys.list(params),
    queryFn: () => fetchRegions(params),
    ...queryConfig,
  });

  return {
    regions: data ?? [],
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: refetch,
  };
}
