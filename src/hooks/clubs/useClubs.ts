import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchClubs } from "@/lib/api/club";
import { GetClubsParams } from "@/types/club";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";

export function useClubs(params?: GetClubsParams) {
  const query = useQuery({
    queryKey: clubKeys.list(params),
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
