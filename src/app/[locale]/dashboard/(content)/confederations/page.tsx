"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useLocale, useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { ImageLabel } from "@/components/shared/ImageLabel";
import useConfederationFilter from "@/hooks/dashboard/confederations/useConfederationFilter";
import {
  useConfederationActions,
  useConfederations,
} from "@/hooks/dashboard/confederations";
import { ConfederationListItem } from "@/types/confederation";
import { formatLocaleDate } from "@/lib/utils/date";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.confederations.columns");

  const locale = useLocale();

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    useConfederationFilter();

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
        <ImageLabel
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
        <ImageLabel imageUrl={confederation.region.imageUrl} label={confederation.region.name} />
      ),

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
