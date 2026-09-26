import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchCompetitionSeasons } from "@/lib/api/competition-season";
import { competitionSeasonKeys } from "@/lib/react-query/keys";
import { CompetitionSeasonQuery } from "@/types/competition-season";

interface UseCompetitionSeasonsOptions {
  competitionId?: string;
  params?: CompetitionSeasonQuery;
  enabled?: boolean;
}

export function useCompetitionSeasons({
  competitionId,
  params,
  enabled = true,
}: UseCompetitionSeasonsOptions) {
  const query = useQuery({
    queryKey: competitionSeasonKeys.list(competitionId!, params),
    queryFn: () => fetchCompetitionSeasons(competitionId!),
    enabled: enabled && !!competitionId,
    ...queryConfig,
  });

  return {
    competitionSeasons: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
