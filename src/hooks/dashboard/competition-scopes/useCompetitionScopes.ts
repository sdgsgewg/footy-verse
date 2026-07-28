import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { CompetitionScopeQuery } from "@/types/competition-scope";
import { competitionScopeKeys } from "@/lib/react-query/keys/competitionScopeKeys";
import { fetchCompetitionScopes } from "@/lib/api/competition-scope";

export function useCompetitionScopes(params?: CompetitionScopeQuery) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: competitionScopeKeys.list(params),
    queryFn: () => fetchCompetitionScopes(params),
    ...queryConfig,
  });

  return {
    competitionScopes: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
