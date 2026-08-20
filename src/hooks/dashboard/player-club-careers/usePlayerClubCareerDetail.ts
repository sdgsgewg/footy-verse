import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubCareerDetail } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface UsePlayerClubCareerOptions {
  playerId: string;
  playerClubCareerId: string;
  enabled?: boolean;
}

export function usePlayerClubCareerDetail({
  playerId,
  playerClubCareerId,
  enabled = true,
}: UsePlayerClubCareerOptions) {
  const query = useQuery({
    queryKey: playerClubCareerKeys.detail(playerId, playerClubCareerId),
    queryFn: () => fetchPlayerClubCareerDetail(playerId!, playerClubCareerId!),
    enabled: enabled && !!playerId && !!playerClubCareerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubCareer: query.data ?? null,
  };
}
