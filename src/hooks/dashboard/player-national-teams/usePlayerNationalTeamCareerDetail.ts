import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";
import { fetchPlayerNationalTeamCareerDetail } from "@/lib/api/player-national-team";

interface UsePlayerNationalTeamCareerOptions {
  playerId: string;
  nationalTeamId: string;
  enabled?: boolean;
}

export function usePlayerNationalTeamCareerDetail({
  playerId,
  nationalTeamId,
  enabled = true,
}: UsePlayerNationalTeamCareerOptions) {
  const query = useQuery({
    queryKey: playerNationalTeamCareerKeys.detail(playerId, nationalTeamId),
    queryFn: () =>
      fetchPlayerNationalTeamCareerDetail(playerId!, nationalTeamId!),
    enabled: enabled && !!playerId && !!nationalTeamId,
    ...queryConfig,
  });

  return {
    ...query,
    playerNationalTeamCareer: query.data ?? null,
  };
}
