import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerCareerEdit } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface UsePlayerCareerOptions {
  playerId: string;
  careerId: string;
  enabled?: boolean;
}

export function usePlayerCareerEdit({
  playerId,
  careerId,
  enabled = true,
}: UsePlayerCareerOptions) {
  const query = useQuery({
    queryKey: playerCareerKeys.edit(playerId, careerId),
    queryFn: () => fetchPlayerCareerEdit(playerId!, careerId!),
    enabled: enabled && !!playerId && !!careerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerCareer: query.data ?? null,
  };
}
