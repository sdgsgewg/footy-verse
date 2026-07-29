import { PlayerFilter } from "@/types/player";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud";

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
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(crud.filters, crud.setFilters, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.clubTeamId !== next.clubTeamId ||
      previous.nationId !== next.nationId ||
      previous.positionId !== next.positionId,
  });

  return {
    ...crud,
    ...pagination,
  };
}
