import { useQuery } from "@tanstack/react-query";

import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchClubBySlug } from "@/lib/api/club";

interface UseClubOptions {
  slug?: string;
  enabled?: boolean;
}

export function useClub({ slug, enabled = true }: UseClubOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.club(slug ?? ""),
    queryFn: () => fetchClubBySlug(slug!),
    enabled: enabled && !!slug,
    ...queryConfig,
  });

  return {
    club: data ?? null,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
