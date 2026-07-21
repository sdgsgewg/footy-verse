import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerCareers } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface UsePlayerCareersOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerCareers({
  playerId,
  enabled = true,
}: UsePlayerCareersOptions) {
  const query = useQuery({
    queryKey: playerCareerKeys.list(playerId ?? ""),
    queryFn: () => fetchPlayerCareers(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerCareers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
