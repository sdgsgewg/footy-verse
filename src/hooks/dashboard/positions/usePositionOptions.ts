import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";
import { fetchPositionOptions } from "@/lib/api/position";

export function usePositionOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: positionKeys.options(),
    queryFn: fetchPositionOptions,
    ...queryConfig,
  });

  return {
    positionOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
