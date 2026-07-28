import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionCategoryKeys } from "@/lib/react-query/keys/competitionCategoryKeys";
import { fetchCompetitionCategories } from "@/lib/api/competition-category";
import { CompetitionCategoryQuery } from "@/types/competition-category";

export function useCompetitionCategories(params?: CompetitionCategoryQuery) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: competitionCategoryKeys.list(params),
    queryFn: () => fetchCompetitionCategories(params),
    ...queryConfig,
  });

  return {
    competitionCategories: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
