import { ClubFilter } from "@/types/club";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: ClubFilter = {
  search: "",

  nationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useClubFilter() {
  return useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.nationId !== next.nationId ||
      previous.sortBy !== next.sortBy ||
      previous.sortOrder !== next.sortOrder,
  });
}
