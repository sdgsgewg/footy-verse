import { useFilters } from "@/hooks/filter";
import { ConfederationFilter } from "@/types/confederation";

const DEFAULT_FILTER: ConfederationFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useConfederationFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
