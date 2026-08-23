import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "@/navigation";
import { useDebounce } from "../useDebounce";

interface CrudFilterBase {
  search: string;
}

interface UseCrudFiltersOptions<TFilter> {
  initialFilter?: TFilter;
  omitDefaultValuesFromUrl?: boolean;
}

export function useCrudFilters<TFilter extends CrudFilterBase>(
  defaultFilter: TFilter,
  {
    initialFilter = defaultFilter,
    omitDefaultValuesFromUrl = false,
  }: UseCrudFiltersOptions<TFilter> = {},
) {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState(initialFilter);

  const debouncedSearch = useDebounce(filters.search, 500);

  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const createQuery = useCallback(
    (filter: TFilter) => {
      const params = new URLSearchParams();

      Object.entries(filter).forEach(([key, value]) => {
        const defaultValue = defaultFilter[key as keyof TFilter];
        const isDefaultValue = value === defaultValue;

        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(omitDefaultValuesFromUrl && isDefaultValue)
        ) {
          params.set(key, String(value));
        }
      });

      return params.toString();
    },
    [defaultFilter, omitDefaultValuesFromUrl],
  );

  const syncUrl = useCallback(
    (next: TFilter) => {
      const query = createQuery(next);

      const current = window.location.search.replace(/^\?/, "");

      if (current === query) return;

      router.replace(query ? `?${query}` : pathname);
    },
    [createQuery, pathname, router],
  );

  function updateFilters(updater: (previous: TFilter) => TFilter) {
    setFilters(updater);
  }

  function setFilter<K extends keyof TFilter>(key: K, value: TFilter[K]) {
    updateFilters((previous) => {
      const next = {
        ...previous,
        [key]: value,
      } as TFilter;

      return next;
    });
  }

  function setFiltersPartial(values: Partial<TFilter>) {
    updateFilters((previous) => {
      const next = {
        ...previous,
        ...values,
      } as TFilter;

      return next;
    });
  }

  function clearFilters() {
    setFilters(defaultFilter);
    syncUrl(defaultFilter);
  }

  return {
    filters,
    debouncedFilters,

    setFilter,
    setFilters: setFiltersPartial,

    syncUrl,
    clearFilters,
  };
}
