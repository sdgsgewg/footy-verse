import { PositionCategoryFilter } from "@/types/position-category";
import { useFilters } from "../filter";

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
