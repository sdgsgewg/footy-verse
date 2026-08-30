import { useFilters } from "@/hooks/filter";
import { parseSearchParams } from "@/lib/utils/crud";
import { regionsQuerySchema } from "@/lib/validations/regions.schema";
import { RegionFilter } from "@/types/region";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: RegionFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useRegionFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, regionsQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
  });

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
  };
}
