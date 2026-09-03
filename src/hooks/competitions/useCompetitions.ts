import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { CompetitionQuery } from "@/types/competition";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";
import { fetchCompetitions } from "@/lib/api/competition";

export function useCompetitions(params?: CompetitionQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: competitionKeys.list(params),
    queryFn: () => fetchCompetitions(params),
    ...queryConfig,
  });

  return {
    competitions: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 20,

    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: refetch,
  };
}
