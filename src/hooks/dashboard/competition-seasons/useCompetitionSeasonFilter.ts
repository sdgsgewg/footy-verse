import { useFilters } from "@/hooks/filter";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { competitionSeasonsQuerySchema } from "@/lib/validations/competition-seasons.schema";
import { CompetitionSeasonFilter } from "@/types/competition-season";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: CompetitionSeasonFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export function useCompetitionSeasonFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, competitionSeasonsQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
  };
}
