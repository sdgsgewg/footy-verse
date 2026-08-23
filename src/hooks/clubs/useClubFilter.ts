import { ClubFilter } from "@/types/club";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud/useCrudPagination";
import { hasFilterChanged } from "@/lib/utils/crud";

const DEFAULT_FILTER: ClubFilter = {
  search: "",

  nationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useClubFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged([
      "search",
      "nationId",
      "sortBy",
      "sortOrder",
    ]),
  });

  const pagination = useCrudPagination(crud.filters, crud.updateFiltersPartial);

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
    ...pagination,
  };
}
