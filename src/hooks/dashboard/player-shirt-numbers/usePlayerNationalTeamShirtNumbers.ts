import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { PlayerShirtNumberQuery } from "@/types/player-shirt-number";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";
import { fetchPlayerNationalTeamShirtNumbers } from "@/lib/api/player-shirt-number";

interface UsePlayerNationalTeamShirtNumbersOptions {
  playerId?: string;
  params?: PlayerShirtNumberQuery;
  enabled?: boolean;
}

export function usePlayerNationalTeamShirtNumbers({
  playerId,
  params,
  enabled = true,
}: UsePlayerNationalTeamShirtNumbersOptions) {
  const query = useQuery({
    queryKey: playerShirtNumberKeys.nationalTeamList(playerId ?? "", params),
    queryFn: () => fetchPlayerNationalTeamShirtNumbers(playerId!, params),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerNationalTeamShirtNumbers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
