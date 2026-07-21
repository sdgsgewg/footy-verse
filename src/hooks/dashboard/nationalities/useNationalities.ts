import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchNationalities } from "@/lib/api/nationality";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { GetNationalitiesParams } from "@/types/nationality";

export function useNationalities(params?: GetNationalitiesParams) {
  const query = useQuery({
    queryKey: nationalityKeys.list(params),
    queryFn: () => fetchNationalities(params),
    ...queryConfig,
  });

  return {
    nationalities: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error,
    retryLoad: query.refetch,
  };
}
