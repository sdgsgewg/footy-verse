import { useCrudFilters } from "@/hooks/crud";
import { CompetitionScopeFilter } from "@/types/competition-scope";

const DEFAULT_FILTER: CompetitionScopeFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionScopeFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
