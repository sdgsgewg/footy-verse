import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerEdit } from "@/lib/api/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

export function usePlayerEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: playerKeys.edit(id),
    queryFn: () => fetchPlayerEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    player: query.data ?? null,
  };
}
