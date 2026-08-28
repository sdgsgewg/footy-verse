import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionScopeKeys } from "@/lib/react-query/keys/competitionScopeKeys";
import { fetchCompetitionScopeOptions } from "@/lib/api/competition-scope";

export function useCompetitionScopeOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: competitionScopeKeys.options(),
    queryFn: fetchCompetitionScopeOptions,
    ...queryConfig,
  });

  return {
    competitionScopeOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
