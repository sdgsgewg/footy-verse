"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import useNationalityFilter from "@/hooks/nationalities/useNationalityFilter";
import { useNationalities } from "@/hooks/nationalities";
import { useNationalityActions } from "@/hooks/dashboard/nationalities";
import { NationalityListItem } from "@/types/nationality";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import {
  ConfederationImageLabel,
  NationalityImageLabel,
} from "@/components/shared/tables/cells";

export default function NationalitiesManagementPage() {
  const tCommon = useTranslations("common");
  const tColumns = useTranslations("dashboard.nationalities.columns");

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, goToPage, changeLimit, update, syncUrl } =
    useNationalityFilter();

  const {
    nationalities,
    limit,
    totalPages,
    total,
    loading,
    loadError,
    retrying,
    retryLoad,
  } = useNationalities({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useNationalityActions();

  const columns: DataColumn<NationalityListItem>[] = [
    {
      key: "name",
      label: tColumns("name"),
      className: "min-w-[240px]",

      render: (nation) => (
        <NationalityImageLabel imageUrl={nation.imageUrl} label={nation.name} />
      ),

      sortable: true,
    },
    {
      key: "fifaCode",
      label: tColumns("fifaCode"),
    },
    {
      key: "confederation",
      label: tColumns("confederation"),

      render: (nation) => (
        <>
          {nation.confederation ? (
            <ConfederationImageLabel
              imageUrl={nation.confederation.imageUrl}
              label={nation.confederation.name}
            />
          ) : (
            <span>-</span>
          )}
        </>
      ),
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial: update,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudListPage
      title={getTitle("list", "nationality")}
      loading={loading}
      data={nationalities}
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
        onSearchChange: (value) => update({ search: value }),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
      pagination={{
        page: filters.page,
        limit,
        totalPages,
        totalItems: total,
        loading,
        onPageChange: goToPage,
        onLimitChange: changeLimit,
      }}
    />
  );
}
