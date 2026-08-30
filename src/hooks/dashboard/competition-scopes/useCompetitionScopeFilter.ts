import { useFilters } from "@/hooks/filter";
import { parseSearchParams } from "@/lib/utils/crud";
import { competitionScopesQuerySchema } from "@/lib/validations/competition-scopes.schema";
import { CompetitionScopeFilter } from "@/types/competition-scope";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: CompetitionScopeFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useCompetitionScopeFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, competitionScopesQuerySchema),
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
