import { useCrudFilters, useCrudPagination } from "@/hooks/crud";
import { ActivityLogFilter } from "@/types/activity-log";

const DEFAULT_FILTER: ActivityLogFilter = {
  search: "",

  page: 1,
  limit: 5,

  sortBy: "created_at",
  sortOrder: "desc",
};

export default function useActivityLogFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(
    crud.filters,
    crud.updateFiltersPartial,
    {
      shouldResetPage: (previous, next) =>
        previous.search !== next.search ||
        previous.sortBy !== next.sortBy ||
        previous.sortOrder !== next.sortOrder,
    },
  );

  return {
    ...crud,
    ...pagination,
  };
}
