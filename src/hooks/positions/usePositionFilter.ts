import { PositionFilter } from "@/types/position";
import { useFilters } from "../filter";

const DEFAULT_FILTER: PositionFilter = {
  search: "",

  categoryId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
