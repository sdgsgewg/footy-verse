import { useQuery } from "@tanstack/react-query";
import { fetchPlayers } from "@/lib/api/player";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { GetPlayersParams } from "@/types/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

export function usePlayers(params?: GetPlayersParams, enabled?: boolean) {
  console.log("Params (hook): ", JSON.stringify(params, null, 2));

  const query = useQuery({
    queryKey: playerKeys.list(params),
    queryFn: () => fetchPlayers(params),
    enabled,
    ...queryConfig,
  });

  return {
    players: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
