import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchClubs } from "@/lib/api/club";
import { GetClubsParams } from "@/types/club";

export function useClubs(params?: GetClubsParams) {
  const query = useQuery({
    queryKey: queryKeys.clubs(params),
    queryFn: () => fetchClubs(params),
    ...queryConfig,
  });

  return {
    clubs: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error,
    retryLoad: query.refetch,
  };
}
