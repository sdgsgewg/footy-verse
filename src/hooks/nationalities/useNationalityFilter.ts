import { NationalityFilter } from "@/types/nationality";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud";

const DEFAULT_FILTER: NationalityFilter = {
  search: "",

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useNationalityFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(crud.filters, crud.setFilters, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.sortBy !== next.sortBy ||
      previous.sortOrder !== next.sortOrder,
  });

  return {
    ...crud,
    ...pagination,
  };
}
