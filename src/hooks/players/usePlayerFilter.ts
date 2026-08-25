import { PlayerFilter } from "@/types/player";
import { useFilters } from "../filter";
import { hasFilterChanged } from "@/lib/utils/crud";
import { usePagination } from "../pagination";

const DEFAULT_FILTER: PlayerFilter = {
  search: "",

  nationId: undefined,
  clubTeamId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePlayerFilter() {
  const crud = useFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged([
      "search",
      "clubTeamId",
      "nationId",
      "positionId",
      "sortBy",
      "sortOrder",
    ]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
