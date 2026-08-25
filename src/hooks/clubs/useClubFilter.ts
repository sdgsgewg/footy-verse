import { ClubFilter } from "@/types/club";
import { useFilters } from "../filter";
import { hasFilterChanged } from "@/lib/utils/crud";
import { usePagination } from "../pagination";

const DEFAULT_FILTER: ClubFilter = {
  search: "",

  nationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useClubFilter() {
  const crud = useFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged([
      "search",
      "nationId",
      "sortBy",
      "sortOrder",
    ]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
    ...pagination,
  };
}
