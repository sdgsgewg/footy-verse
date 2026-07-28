import { useCrudFilters } from "@/hooks/crud";
import { CompetitionCategoryFilter } from "@/types/competition-category";

const DEFAULT_FILTER: CompetitionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionCategoryFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
