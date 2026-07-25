import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchNationalities } from "@/lib/api/nationality";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { NationalityQuery } from "@/types/nationality";

export function useNationalities(params?: NationalityQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: nationalityKeys.list(params),
    queryFn: () => fetchNationalities(params),
    ...queryConfig,
  });

  return {
    nationalities: data?.items ?? [],
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
