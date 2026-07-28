import { useCrudFilters } from "@/hooks/crud";
import { RegionFilter } from "@/types/region";

const DEFAULT_FILTER: RegionFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useRegionFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
