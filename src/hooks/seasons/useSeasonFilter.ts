import { SeasonFilter } from "@/types/season";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: SeasonFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useSeasonFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
