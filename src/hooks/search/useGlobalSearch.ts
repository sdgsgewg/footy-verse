"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchGlobalSearch } from "@/lib/api/search";
import { searchKeys } from "@/lib/react-query/keys";

export function useGlobalSearch(query: string) {
  const normalizedQuery = query.trim();

  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: searchKeys.global(normalizedQuery),
    queryFn: () => fetchGlobalSearch(normalizedQuery),
    enabled: normalizedQuery.length > 0,
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
