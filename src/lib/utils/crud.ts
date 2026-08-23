import { SortOrder } from "@/types/sort";

interface CreateSortHandlerOptions<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: SortOrder;
  updateFiltersPartial: (
    values: Partial<{
      sortBy: TSortBy;
      sortOrder: SortOrder;
    }>,
  ) => void;
}

export function createSortHandler<TSortBy extends string>({
  sortBy,
  sortOrder,
  updateFiltersPartial,
}: CreateSortHandlerOptions<TSortBy>) {
  return (column: string) => {
    if (column === sortBy) {
      updateFiltersPartial({
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      updateFiltersPartial({
        sortBy: column as TSortBy,
        sortOrder: "asc",
      });
    }
  };
}

export function hasFilterChanged<T extends object>(keys: readonly (keyof T)[]) {
  return (previous: T, next: T): boolean => {
    return keys.some((key) => previous[key] !== next[key]);
  };
}
