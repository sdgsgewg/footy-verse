import { useFilters } from "@/hooks/filter";
import { CompetitionScopeFilter } from "@/types/competition-scope";

const DEFAULT_FILTER: CompetitionScopeFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionScopeFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
