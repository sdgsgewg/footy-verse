import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchClubs } from "@/lib/api/club";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";
import { ClubQuery } from "@/types/club";

export function useClubs(params?: ClubQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: clubKeys.list(params),
    queryFn: () => fetchClubs(params),
    ...queryConfig,
  });

  return {
    clubs: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 20,

    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: refetch,
  };
}
