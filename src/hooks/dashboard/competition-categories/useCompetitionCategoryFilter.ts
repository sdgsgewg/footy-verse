import { useFilters } from "@/hooks/filter";
import { CompetitionCategoryFilter } from "@/types/competition-category";

const DEFAULT_FILTER: CompetitionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionCategoryFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
