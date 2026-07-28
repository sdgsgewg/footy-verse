import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { PlayerTransferQuery } from "@/types/player-transfer";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { fetchPlayerTransfers } from "@/lib/api/player-transfer";

interface UsePlayerTransfersOptions {
  playerId?: string;
  params?: PlayerTransferQuery;
  enabled?: boolean;
}

export function usePlayerTransfers({
  playerId,
  params,
  enabled = true,
}: UsePlayerTransfersOptions) {
  const query = useQuery({
    queryKey: playerTransferKeys.list(playerId ?? "", params),
    queryFn: () => fetchPlayerTransfers(playerId!, params),
    enabled: enabled && !!playerId,
    ...queryConfig,
  });

  return {
    playerTransfers: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error ?? null,
    retryLoad: query.refetch,
  };
}
