import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerNationalTeamCareers } from "@/lib/api/player-national-team";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface UsePlayerNationalTeamCareersOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerNationalTeamCareers({
  playerId,
  enabled = true,
}: UsePlayerNationalTeamCareersOptions) {
  const query = useQuery({
    queryKey: playerNationalTeamCareerKeys.list(playerId ?? ""),
    queryFn: () => fetchPlayerNationalTeamCareers(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerNationalTeamCareers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
