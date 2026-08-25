import { NationalityFilter } from "@/types/nationality";
import { useFilters } from "../filter";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { nationalitiesQuerySchema } from "@/lib/validations/nationalities.schema";
import { usePagination } from "../pagination";

const DEFAULT_FILTER: NationalityFilter = {
  search: "",

  confederationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useNationalityFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, nationalitiesQuerySchema),
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
