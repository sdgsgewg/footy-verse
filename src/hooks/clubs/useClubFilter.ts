import { ClubFilter } from "@/types/club";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud/useCrudPagination";

const DEFAULT_FILTER: ClubFilter = {
  search: "",

  nationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useClubFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(crud.filters, crud.setFilters, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.nationId !== next.nationId ||
      previous.sortBy !== next.sortBy ||
      previous.sortOrder !== next.sortOrder,
  });

  return {
    ...crud,
    ...pagination,
  };
}
