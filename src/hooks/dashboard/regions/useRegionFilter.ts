import { useFilters } from "@/hooks/filter";
import { RegionFilter } from "@/types/region";

const DEFAULT_FILTER: RegionFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useRegionFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
