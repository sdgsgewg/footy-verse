import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";
import { fetchPositionCategoryOptions } from "@/lib/api/position-category";

export function usePositionCategoryOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: positionCategoryKeys.options(),
    queryFn: fetchPositionCategoryOptions,
    ...queryConfig,
  });

  return {
    positionCategoryOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
