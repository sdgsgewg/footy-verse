interface PaginationFilter {
  page: number;
  limit: number;
}

interface PaginationOptions<TFilter extends PaginationFilter> {
  shouldResetPage?: (previous: TFilter, next: TFilter) => boolean;
}

export function useCrudPagination<TFilter extends PaginationFilter>(
  filters: TFilter,
  updateFiltersPartial: (values: Partial<TFilter>) => void,
  options?: PaginationOptions<TFilter>,
) {
  function goToPage(page: number) {
    updateFiltersPartial({ page } as Partial<TFilter>);
  }

  function nextPage() {
    updateFiltersPartial({
      page: filters.page + 1,
    } as Partial<TFilter>);
  }

  function previousPage() {
    updateFiltersPartial({
      page: filters.page - 1,
    } as Partial<TFilter>);
  }

  function changeLimit(limit: number) {
    updateFiltersPartial({
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

    updateFiltersPartial({
      ...values,
      ...(shouldResetPage ? { page: 1 } : {}),
    });
  }

  return {
    goToPage,
    nextPage,
    previousPage,
    changeLimit,
    update,
  };
}
