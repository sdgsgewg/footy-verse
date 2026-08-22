import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";
import { fetchConfederationOptions } from "@/lib/api/confederation";

export function useConfederationOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: confederationKeys.options(),
    queryFn: fetchConfederationOptions,
    ...queryConfig,
  });

  return {
    confederationOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
