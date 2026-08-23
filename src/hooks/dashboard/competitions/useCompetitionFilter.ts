import { useCrudFilters, useCrudPagination } from "@/hooks/crud";
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
  const crud = useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = useCrudPagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
