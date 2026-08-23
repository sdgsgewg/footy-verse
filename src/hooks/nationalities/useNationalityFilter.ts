import { NationalityFilter } from "@/types/nationality";
import { useCrudFilters } from "../crud/useCrudFilters";
import { useCrudPagination } from "../crud";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { hasFilterChanged } from "@/lib/utils/crud";

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

  const initialFilter = useMemo<NationalityFilter>(() => {
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    return {
      search: searchParams.get("search") ?? "",
      confederationId: searchParams.get("confederationId") ?? undefined,
      page: Number.isInteger(page) && page > 0 ? page : DEFAULT_FILTER.page,
      limit:
        Number.isInteger(limit) && limit > 0 && limit <= 100
          ? limit
          : DEFAULT_FILTER.limit,
      sortBy: sortBy === "created_at" ? sortBy : DEFAULT_FILTER.sortBy,
      sortOrder: sortOrder === "desc" ? sortOrder : DEFAULT_FILTER.sortOrder,
    };
  }, [searchParams]);

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
