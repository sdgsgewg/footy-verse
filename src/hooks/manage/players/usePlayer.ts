import { useQuery } from "@tanstack/react-query";

import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPlayerById } from "@/lib/api/player";

interface UsePlayerOptions {
  id?: string;
  enabled?: boolean;
}

export function usePlayer({ id, enabled = true }: UsePlayerOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.player(id ?? ""),
    queryFn: () => fetchPlayerById(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    player: data ?? null,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
