import { useQuery } from "@tanstack/react-query";

import { fetchPlayers } from "@/lib/api/player";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function usePlayers() {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.players(),
    queryFn: fetchPlayers,
    ...queryConfig,
  });

  return {
    players: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
