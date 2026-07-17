import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPlayerCareerById } from "@/lib/api/player-career";

interface UsePlayerCareerOptions {
  playerId?: string;
  careerId?: string;
  enabled?: boolean;
}

export function usePlayerCareer({
  playerId,
  careerId,
  enabled = true,
}: UsePlayerCareerOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.player_career(playerId ?? "", careerId ?? ""),
    queryFn: () => fetchPlayerCareerById(playerId!, careerId!),
    enabled: enabled && !!playerId && !!careerId,
    ...queryConfig,
  });

  return {
    playerCareer: data ?? null,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
