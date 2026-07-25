import { useQuery } from "@tanstack/react-query";
import { fetchPlayers } from "@/lib/api/player";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { PlayerQuery } from "@/types/player";

export function usePlayers(params?: PlayerQuery, enabled: boolean = true) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: playerKeys.list(params),
    queryFn: () => fetchPlayers(params),
    enabled,
    ...queryConfig,
  });

  return {
    players: data?.items ?? [],
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
