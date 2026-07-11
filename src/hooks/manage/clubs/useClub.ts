import { useQuery } from "@tanstack/react-query";

import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchClubById } from "@/lib/api/club";

interface UseClubOptions {
  id?: string;
  enabled?: boolean;
}

export function useClub({ id, enabled = true }: UseClubOptions) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: queryKeys.club(id ?? ""),
    queryFn: () => fetchClubById(id!),
    enabled: enabled && !!id,
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
