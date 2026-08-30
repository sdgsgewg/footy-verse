import { useFilters } from "@/hooks/filter";
import { parseSearchParams } from "@/lib/utils/crud";
import { competitionCategoriesQuerySchema } from "@/lib/validations/competition-categories.schema";
import { CompetitionCategoryFilter } from "@/types/competition-category";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: CompetitionCategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionCategoryFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, competitionCategoriesQuerySchema),
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
