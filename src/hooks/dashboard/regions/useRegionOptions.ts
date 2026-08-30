import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { regionKeys } from "@/lib/react-query/keys/regionKeys";
import { fetchRegionOptions } from "@/lib/api/region";

export function useRegionOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: regionKeys.options(),
    queryFn: fetchRegionOptions,
    ...queryConfig,
  });

  return {
    regionOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
