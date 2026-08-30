import { useFilters } from "@/hooks/filter";
import { parseSearchParams } from "@/lib/utils/crud";
import { confederationsQuerySchema } from "@/lib/validations/confederations.schema";
import { ConfederationFilter } from "@/types/confederation";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: ConfederationFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export default function useConfederationFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, confederationsQuerySchema),
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
