import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { PlayerTransferQuery } from "@/types/player-transfer";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { fetchAllPlayerTransfers } from "@/lib/api/player-transfer";

export function useAllPlayerTransfers(params?: PlayerTransferQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: playerTransferKeys.list(params),
    queryFn: () => fetchAllPlayerTransfers(params),
    ...queryConfig,
  });

  return {
    allPlayerTransfers: data ?? [],
    isLoading,
    isRefetching,
    error,
    refetch,
  };
}
