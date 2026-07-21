import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerDetail } from "@/lib/api/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

export function usePlayerDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: playerKeys.detail(id),
    queryFn: () => fetchPlayerDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    player: query.data ?? null,
  };
}
