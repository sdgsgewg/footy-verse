import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";
import { fetchPlayerNationalTeams } from "@/lib/api/player-national-team";

interface UsePlayerNationalTeamsOptions {
  playerId?: string;
  enabled?: boolean;
}

export function usePlayerNationalTeams({
  playerId,
  enabled = true,
}: UsePlayerNationalTeamsOptions) {
  const query = useQuery({
    queryKey: playerNationalTeamKeys.list(playerId ?? ""),
    queryFn: () => fetchPlayerNationalTeams(playerId!),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerNationalTeams: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
