import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchSeasons } from "@/lib/api/season";
import { seasonKeys } from "@/lib/react-query/keys/seasonKeys";
import { GetSeasonsParams } from "@/types/season";

export function useSeasons(params?: GetSeasonsParams) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: seasonKeys.list(params),
    queryFn: () => fetchSeasons(params),
    ...queryConfig,
  });

  return {
    seasons: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
