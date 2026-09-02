"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchSearchSuggestions } from "@/lib/api/search";
import { searchKeys } from "@/lib/react-query/keys/searchKeys";

export function useSearchSuggestions(query: string) {
  const normalizedQuery = query.trim();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: searchKeys.suggestions(normalizedQuery),

    queryFn: () => fetchSearchSuggestions(normalizedQuery),

    enabled: normalizedQuery.length >= 2,

    ...queryConfig,
  });

  return {
    groups: data?.groups ?? [],
    loading: isLoading,
    fetching: isFetching,
    loadError: error ?? null,
  };
}
