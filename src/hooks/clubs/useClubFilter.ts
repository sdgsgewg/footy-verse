import { ClubFilter } from "@/types/club";
import { useFilters } from "../filter";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { usePagination } from "../pagination";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { clubsQuerySchema } from "@/lib/validations/clubs.schema";

const DEFAULT_FILTER: ClubFilter = {
  search: "",

  nationId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useClubFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, clubsQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged([
      "search",
      "nationId",
      "sortBy",
      "sortOrder",
    ]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
    ...pagination,
  };
}
