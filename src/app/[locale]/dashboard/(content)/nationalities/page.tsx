"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import Image from "next/image";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import useNationalityFilter from "@/hooks/nationalities/useNationalityFilter";
import { useNationalities } from "@/hooks/nationalities";
import { useNationalityActions } from "@/hooks/dashboard/nationalities";
import { NationalityListItem } from "@/types/nationality";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

export default function NationalitiesManagementPage() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.nationalities.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    setFilter,
    setFilters,
    goToPage,
    syncUrl,
  } = useNationalityFilter();

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
      label: tColumn("name"),
      className: "min-w-[320px]",

      render: (nation) => (
        <div className="flex items-center gap-3">
          <Image
            src={nation.imageUrl}
            alt={nation.name}
            width={32}
            height={32}
            className="size-8 object-contain"
          />

          <span>{nation.name}</span>
        </div>
      ),

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
        onSearchChange: (value) => setFilter("search", value),
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
      }}
    />
  );
}
