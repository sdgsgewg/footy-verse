"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "@/navigation";
import { useDebounce } from "../useDebounce";

interface CrudFilterBase {
  search: string;
  page: number;
}

interface UseCrudFiltersOptions<TFilter> {
  shouldResetPage?: (previous: TFilter, next: TFilter) => boolean;
}

export function useCrudFilters<TFilter extends CrudFilterBase>(
  defaultFilter: TFilter,
  options?: UseCrudFiltersOptions<TFilter>,
) {
  const router = useRouter();

  const [filters, setFilters] = useState<TFilter>(defaultFilter);

  const debouncedSearch = useDebounce(filters.search, 500);

  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  function createQuery(filter: TFilter) {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    return params.toString();
  }

  const syncUrl = useCallback(
    (next: TFilter) => {
      const query = createQuery(next);

      const current = window.location.search.replace(/^\?/, "");

      if (current === query) return;

      router.replace(query ? `?${query}` : "?");
    },
    [router],
  );

  function updateFilters(updater: (previous: TFilter) => TFilter) {
    setFilters(updater);
  }

  function setFilter<K extends keyof TFilter>(key: K, value: TFilter[K]) {
    updateFilters((previous) => {
      const next: TFilter = {
        ...previous,
        [key]: value,
      };

      if (options?.shouldResetPage?.(previous, next)) {
        next.page = 1;
      }

      return next;
    });
  }

  function setFiltersPartial(values: Partial<TFilter>) {
    updateFilters((previous) => {
      const next: TFilter = {
        ...previous,
        ...values,
      };

      if (options?.shouldResetPage?.(previous, next)) {
        next.page = 1;
      }

      return next;
    });
  }

  function clearFilters() {
    setFilters(defaultFilter);

    router.replace("?");
  }

  return {
    filters,
    debouncedFilters,

    setFilter,
    setFilters: setFiltersPartial,

    nextPage: () => setFilter("page", filters.page + 1),

    previousPage: () => setFilter("page", filters.page - 1),

    goToPage: (page: number) => setFilter("page", page),

    syncUrl,

    clearFilters,
  };
}
