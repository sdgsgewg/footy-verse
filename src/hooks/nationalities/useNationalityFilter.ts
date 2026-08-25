import { NationalityFilter } from "@/types/nationality";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { nationalitiesQuerySchema } from "@/lib/validations/nationalities.schema";

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

  const crud = useCrudFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = useCrudPagination(crud.filters, crud.updateFiltersPartial);

  return {
    ...crud,
    ...pagination,
  };
}
