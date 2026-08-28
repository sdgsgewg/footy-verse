import { PositionCategoryFilter } from "@/types/position-category";
import { useFilters } from "../filter";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { parseSearchParams } from "@/lib/utils/crud";
import { positionCategoriesQuerySchema } from "@/lib/validations/position-categories.schema";

const DEFAULT_FILTER: PositionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionCategoryFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, positionCategoriesQuerySchema),
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
