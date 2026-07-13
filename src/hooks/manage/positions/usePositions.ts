import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPositions } from "@/lib/api/position";

export function usePositions() {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.positions(),
    queryFn: fetchPositions,
    ...queryConfig,
  });

  return {
    positions: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
