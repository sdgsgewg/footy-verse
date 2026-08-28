import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubTeamCareers } from "@/lib/api/player-club-team-career";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";

interface UsePlayerClubTeamCareersOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerClubTeamCareers({
  playerId,
  enabled = true,
}: UsePlayerClubTeamCareersOptions) {
  const query = useQuery({
    queryKey: playerClubTeamCareerKeys.list(playerId ?? ""),
    queryFn: () => fetchPlayerClubTeamCareers(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerClubTeamCareers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
