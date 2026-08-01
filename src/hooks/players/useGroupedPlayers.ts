import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { GroupedPlayerQuery } from "@/types/player";
import { fetchGroupedPlayers } from "@/lib/api/player";

export function useGroupedPlayers(
  params?: GroupedPlayerQuery,
  enabled: boolean = true,
) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: playerKeys.groupedList(params),
    queryFn: () => fetchGroupedPlayers(params),
    enabled,
    ...queryConfig,
  });

  return {
    groupedPlayers: data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
}
