import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { ConfederationQuery } from "@/types/confederation";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";
import { fetchConfederations } from "@/lib/api/confederation";

export function useConfederations(params?: ConfederationQuery) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: confederationKeys.list(params),
    queryFn: () => fetchConfederations(params),
    ...queryConfig,
  });

  return {
    confederations: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: refetch,
  };
}
