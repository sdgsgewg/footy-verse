import { PlayerFilter } from "@/types/player";
import { useFilters } from "../filter";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { usePagination } from "../pagination";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { playersQuerySchema } from "@/lib/validations/players.schema";

const DEFAULT_FILTER: PlayerFilter = {
  search: "",

  nationId: undefined,
  clubTeamId: undefined,

  page: 1,
  limit: 20,

  sortBy: "shortName",
  sortOrder: "asc",
};

export default function usePlayerFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, playersQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged([
      "search",
      "clubTeamId",
      "nationId",
      "positionId",
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
