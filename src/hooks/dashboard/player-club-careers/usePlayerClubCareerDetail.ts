import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubCareerDetail } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface UsePlayerClubCareerOptions {
  playerId: string;
  careerId: string;
  enabled?: boolean;
}

export function usePlayerClubCareerDetail({
  playerId,
  careerId,
  enabled = true,
}: UsePlayerClubCareerOptions) {
  const query = useQuery({
    queryKey: playerClubCareerKeys.detail(playerId, careerId),
    queryFn: () => fetchPlayerClubCareerDetail(playerId!, careerId!),
    enabled: enabled && !!playerId && !!careerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubCareer: query.data ?? null,
  };
}
