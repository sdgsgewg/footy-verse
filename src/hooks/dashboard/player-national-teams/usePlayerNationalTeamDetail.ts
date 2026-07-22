import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";
import { fetchPlayerNationalTeamDetail } from "@/lib/api/player-national-team";

interface UsePlayerNationalTeamOptions {
  playerId: string;
  nationalTeamId: string;
  enabled?: boolean;
}

export function usePlayerNationalTeamDetail({
  playerId,
  nationalTeamId,
  enabled = true,
}: UsePlayerNationalTeamOptions) {
  const query = useQuery({
    queryKey: playerNationalTeamKeys.detail(playerId, nationalTeamId),
    queryFn: () => fetchPlayerNationalTeamDetail(playerId!, nationalTeamId!),
    enabled: enabled && !!playerId && !!nationalTeamId,
    ...queryConfig,
  });

  return {
    ...query,
    playerNationalTeam: query.data ?? null,
  };
}
