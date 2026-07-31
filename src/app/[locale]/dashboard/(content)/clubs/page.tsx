"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { useClubs } from "@/hooks/clubs";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { useClubActions } from "@/hooks/dashboard/clubs";
import { DataColumn } from "@/types/table";
import { ClubListItem } from "@/types/club/responses";
import useClubFilter from "@/hooks/clubs/useClubFilter";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import {
  ClubImageLabel,
  NationalityImageLabel,
} from "@/components/shared/tables/cells";

export default function ClubsManagementPage() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.clubs.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    setFilter,
    setFilters,
    goToPage,
    syncUrl,
  } = useClubFilter();

  const {
    clubs,
    limit,
    totalPages,
    total,
    loading,
    loadError,
    retrying,
    retryLoad,
  } = useClubs({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useClubActions();

  const columns: DataColumn<ClubListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",

      render: (club) => (
        <ClubImageLabel imageUrl={club.imageUrl} label={club.name} />
      ),

      sortable: true,
    },

    {
      key: "nation",
      label: tColumn("nation"),
      className: "min-w-[200px]",

      render: (club) =>
        club.nation ? (
          <NationalityImageLabel
            imageUrl={club.nation.imageUrl}
            label={club.nation.name}
          />
        ) : (
          "-"
        ),
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
      title={getTitle("list", "club")}
      loading={loading}
      data={clubs}
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
