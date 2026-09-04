"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchHomeStatistics } from "@/lib/api/statistic";
import { statisticKeys } from "@/lib/react-query/keys";

export function useHomeStatistics() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: statisticKeys.summary(),
    queryFn: () => fetchHomeStatistics(),
    ...queryConfig,
  });

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
}
