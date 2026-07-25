import { NationalityFilter } from "@/types/nationality";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: NationalityFilter = {
  search: "",

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useNationalityFilter() {
  return useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.sortBy !== next.sortBy ||
      previous.sortOrder !== next.sortOrder,
  });
}
