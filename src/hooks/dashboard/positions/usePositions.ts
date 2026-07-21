import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPositions } from "@/lib/api/position";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";
import { GetPositionsParams } from "@/types/position";

export function usePositions(params?: GetPositionsParams) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: positionKeys.list(params),
    queryFn: () => fetchPositions(params),
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
