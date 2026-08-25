import { useFilters } from "@/hooks/filter";
import { usePagination } from "@/hooks/pagination";
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
  const crud = useFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
