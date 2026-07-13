import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPlayerCareers } from "@/lib/api/player-career";

interface UsePlayerCareersOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerCareers({
  playerId,
  enabled = true,
}: UsePlayerCareersOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.player(playerId ?? ""),
    queryFn: () => fetchPlayerCareers(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerCareers: data ?? null,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
