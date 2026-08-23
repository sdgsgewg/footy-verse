import { PlayerFilter } from "@/types/player";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud";
import { hasFilterChanged } from "@/lib/utils/crud";

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
  const crud = useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: hasFilterChanged([
      "search",
      "clubTeamId",
      "nationId",
      "positionId",
      "sortBy",
      "sortOrder",
    ]),
  });

  const pagination = useCrudPagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
