import { SeasonFilter } from "@/types/season";
import { useFilters } from "../filter";

const DEFAULT_FILTER: SeasonFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useSeasonFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
