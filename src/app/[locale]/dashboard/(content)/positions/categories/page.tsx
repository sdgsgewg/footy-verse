"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import usePositionCategoryFilter from "@/hooks/position-categories/usePositionCategoryFilter";
import {
  usePositionCategories,
  usePositionCategoryActions,
} from "@/hooks/dashboard/position-categories";
import { PositionCategoryListItem } from "@/types/position-category";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.positionCategories.columns");

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    usePositionCategoryFilter();

  const { positionCategories, loading, loadError, retrying, retryLoad } =
    usePositionCategories({
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    usePositionCategoryActions();

  const columns: DataColumn<PositionCategoryListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",
      sortable: true,
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    setFilters,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudListPage
      title={getTitle("list", "positionCategory")}
      loading={loading}
      data={positionCategories}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      actions={{
        onCreate: handleCreate,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => setFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
