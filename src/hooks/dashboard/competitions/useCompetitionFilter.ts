import { useCrudFilters, useCrudPagination } from "@/hooks/crud";
import { CompetitionFilter } from "@/types/competition";

const DEFAULT_FILTER: CompetitionFilter = {
  search: "",

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(
    crud.filters,
    crud.updateFiltersPartial,
    {
      shouldResetPage: (previous, next) => previous.search !== next.search,
    },
  );

  return {
    ...crud,
    ...pagination,
  };
}
