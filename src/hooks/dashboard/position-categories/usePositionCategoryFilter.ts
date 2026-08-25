import { useFilters } from "@/hooks/filter";
import { PositionCategoryFilter } from "@/types/position-category";

const DEFAULT_FILTER: PositionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionCategoryFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
