import { useCrudFilters } from "@/hooks/crud";
import { ConfederationFilter } from "@/types/confederation";

const DEFAULT_FILTER: ConfederationFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useConfederationFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
