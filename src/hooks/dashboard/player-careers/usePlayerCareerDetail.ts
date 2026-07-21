import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerCareerDetail } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface UsePlayerCareerOptions {
  playerId: string;
  careerId: string;
  enabled?: boolean;
}

export function usePlayerCareerDetail({
  playerId,
  careerId,
  enabled = true,
}: UsePlayerCareerOptions) {
  const query = useQuery({
    queryKey: playerCareerKeys.detail(playerId, careerId),
    queryFn: () => fetchPlayerCareerDetail(playerId!, careerId!),
    enabled: enabled && !!playerId && !!careerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerCareer: query.data ?? null,
  };
}
