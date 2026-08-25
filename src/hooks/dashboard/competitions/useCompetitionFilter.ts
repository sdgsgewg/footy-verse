import { useFilters } from "@/hooks/filter";
import { usePagination } from "@/hooks/pagination";
import { hasFilterChanged } from "@/lib/utils/crud";
import { CompetitionFilter } from "@/types/competition";

const DEFAULT_FILTER: CompetitionFilter = {
  search: "",

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionFilter() {
  const crud = useFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
