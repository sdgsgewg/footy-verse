import { useCrudFilters, useCrudPagination } from "@/hooks/crud";
import { hasFilterChanged } from "@/lib/utils/crud";
import { ActivityLogFilter } from "@/types/activity-log";

const DEFAULT_FILTER: ActivityLogFilter = {
  search: "",

  page: 1,
  limit: 5,

  sortBy: "created_at",
  sortOrder: "desc",
};

export default function useActivityLogFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = useCrudPagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
