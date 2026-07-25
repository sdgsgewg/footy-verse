import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { PositionCategoryQuery } from "@/types/position-category";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";
import { fetchPositionCategories } from "@/lib/api/position-category";

export function usePositionCategories(params?: PositionCategoryQuery) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: positionCategoryKeys.list(params),
    queryFn: () => fetchPositionCategories(params),
    ...queryConfig,
  });

  return {
    positionCategories: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
