import { PositionFilter } from "@/types/position";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: PositionFilter = {
  search: "",

  categoryId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
