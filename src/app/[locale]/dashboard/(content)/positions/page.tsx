"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import usePositionFilter from "@/hooks/positions/usePositionFilter";
import { PositionListItem } from "@/types/position";
import { usePositionActions, usePositions } from "@/hooks/dashboard/positions";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.positions.columns");

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    usePositionFilter();

  const { positions, loading, loadError, retrying, retryLoad } = usePositions({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleReorder, handleView, handleEdit, handleDelete } =
    usePositionActions();

  const columns: DataColumn<PositionListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",
      sortable: true,
    },

    {
      key: "categoryName",
      label: tColumn("category"),
      className: "min-w-[200px]",
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
      title={getTitle("list", "position")}
      loading={loading}
      data={positions}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      actions={{
        onCreate: handleCreate,
        onReorder: handleReorder,
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
