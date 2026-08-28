import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionCategoryKeys } from "@/lib/react-query/keys/competitionCategoryKeys";
import { fetchCompetitionCategoryOptions } from "@/lib/api/competition-category";

export function useCompetitionCategoryOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: competitionCategoryKeys.options(),
    queryFn: fetchCompetitionCategoryOptions,
    ...queryConfig,
  });

  return {
    competitionCategoryOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
