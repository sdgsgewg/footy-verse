import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubCareers } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface UsePlayerClubCareersOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerClubCareers({
  playerId,
  enabled = true,
}: UsePlayerClubCareersOptions) {
  const query = useQuery({
    queryKey: playerClubCareerKeys.list(playerId ?? ""),
    queryFn: () => fetchPlayerClubCareers(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerClubCareers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
