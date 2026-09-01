"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useLocale, useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useFilterSync } from "@/hooks/filter";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import useConfederationFilter from "@/hooks/dashboard/confederations/useConfederationFilter";
import {
  useConfederationActions,
  useConfederations,
} from "@/hooks/dashboard/confederations";
import { ConfederationListItem } from "@/types/confederation";
import { formatLocaleDate } from "@/lib/utils/date";
import {
  ConfederationImageLabel,
  RegionImageLabel,
} from "@/components/shared/tables/cells";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.confederations.columns");

  const locale = useLocale();

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = useConfederationFilter();

  const { confederations, loading, loadError, retrying, retryLoad } =
    useConfederations({
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useConfederationActions();

  const columns: DataColumn<ConfederationListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",

      render: (confederation) => (
        <ConfederationImageLabel
          imageUrl={confederation.imageUrl}
          label={confederation.name}
        />
      ),

      sortable: true,
    },

    {
      key: "founded",
      label: tColumn("founded"),
      render: (confederation) =>
        confederation.founded ? (
          formatLocaleDate(confederation.founded, locale)
        ) : (
          <span>-</span>
        ),
      sortable: true,
    },

    {
      key: "region",
      label: tColumn("region"),

      render: (confederation) => (
        <RegionImageLabel
          imageUrl={confederation.region.imageUrl}
          label={confederation.region.name}
        />
      ),

      className: "min-w-[200px]",
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial,
  });

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudListPage
      title={getTitle("list", "confederation")}
      loading={loading}
      data={confederations}
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
        onSearchChange: (value) => updateFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
