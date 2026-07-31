import { useQuery } from "@tanstack/react-query";

import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { fetchNationalityOptions } from "@/lib/api/nationality";

export function useNationalityOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: nationalityKeys.options(),
    queryFn: fetchNationalityOptions,
    ...queryConfig,
  });

  return {
    nationalities: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
