import { PositionCategoryFilter } from "@/types/position-category";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: PositionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionCategoryFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
