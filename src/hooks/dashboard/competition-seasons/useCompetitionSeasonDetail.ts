import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchCompetitionSeasonDetail } from "@/lib/api/competition-season";
import { competitionSeasonKeys } from "@/lib/react-query/keys";

interface UseCompetitionSeasonDetailOptions {
  competitionId: string;
  competitionSeasonId: string;
  enabled?: boolean;
}

export function useCompetitionSeasonDetail({
  competitionId,
  competitionSeasonId,
  enabled = true,
}: UseCompetitionSeasonDetailOptions) {
  const query = useQuery({
    queryKey: competitionSeasonKeys.detail(competitionId, competitionSeasonId),
    queryFn: () =>
      fetchCompetitionSeasonDetail(competitionId, competitionSeasonId),
    enabled: enabled && !!competitionId && !!competitionSeasonId,
    ...queryConfig,
  });

  return {
    ...query,
    competitionSeason: query.data ?? null,
  };
}
