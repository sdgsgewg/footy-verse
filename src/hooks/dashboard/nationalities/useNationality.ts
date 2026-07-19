import { useQuery } from "@tanstack/react-query";

import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchNationalityBySlug } from "@/lib/api/nationality";

interface UseNationalityOptions {
  slug?: string;
  enabled?: boolean;
}

export function useNationality({
  slug,
  enabled = true,
}: UseNationalityOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.nationality(slug ?? ""),
    queryFn: () => fetchNationalityBySlug(slug!),
    enabled: enabled && !!slug,
    ...queryConfig,
  });

  return {
    nationality: data ?? null,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
