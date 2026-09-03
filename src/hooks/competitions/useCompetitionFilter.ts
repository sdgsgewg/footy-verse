import { useFilters } from "@/hooks/filter";
import { usePagination } from "@/hooks/pagination";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { competitionsQuerySchema } from "@/lib/validations/competitions.schema";
import { CompetitionFilter } from "@/types/competition";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: CompetitionFilter = {
  search: "",

  categoryId: undefined,
  scopeId: undefined,

  participantType: undefined,
  gender: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export function useCompetitionFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, competitionsQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
    ...pagination,
  };
}
