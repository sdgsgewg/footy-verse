interface PaginationFilter {
  page: number;
  limit: number;
}

interface PaginationOptions<TFilter extends PaginationFilter> {
  shouldResetPage?: (previous: TFilter, next: TFilter) => boolean;
}

export function useCrudPagination<TFilter extends PaginationFilter>(
  filters: TFilter,
  setFilters: (values: Partial<TFilter>) => void,
  options?: PaginationOptions<TFilter>,
) {
  function changeLimit(limit: number) {
    setFilters({
      limit,
      page: 1,
    } as Partial<TFilter>);
  }

  function update(values: Partial<TFilter>) {
    const next = {
      ...filters,
      ...values,
    };

    const shouldResetPage = options?.shouldResetPage?.(filters, next) ?? false;

    setFilters({
      ...values,
      ...(shouldResetPage ? { page: 1 } : {}),
    });
  }

  return {
    goToPage(page: number) {
      setFilters({ page } as Partial<TFilter>);
    },

    nextPage() {
      setFilters({
        page: filters.page + 1,
      } as Partial<TFilter>);
    },

    previousPage() {
      setFilters({
        page: filters.page - 1,
      } as Partial<TFilter>);
    },

    changeLimit,

    update,
  };
}
