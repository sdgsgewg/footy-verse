import { PositionFilter } from "@/types/position";
import { useFilters } from "../filter";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { parseSearchParams } from "@/lib/utils/crud";
import { positionsQuerySchema } from "@/lib/validations/positions.schema";

const DEFAULT_FILTER: PositionFilter = {
  search: "",

  categoryId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePositionFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, positionsQuerySchema),
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
