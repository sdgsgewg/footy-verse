import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { PlayerShirtNumberQuery } from "@/types/player-shirt-number";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";
import { fetchPlayerClubTeamShirtNumbers } from "@/lib/api/player-shirt-number";

interface UsePlayerClubTeamShirtNumbersOptions {
  playerId?: string;
  params?: PlayerShirtNumberQuery;
  enabled?: boolean;
}

export function usePlayerClubTeamShirtNumbers({
  playerId,
  params,
  enabled = true,
}: UsePlayerClubTeamShirtNumbersOptions) {
  const query = useQuery({
    queryKey: playerShirtNumberKeys.clubTeam(playerId ?? "", params),
    queryFn: () => fetchPlayerClubTeamShirtNumbers(playerId!, params),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerClubTeamShirtNumbers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
