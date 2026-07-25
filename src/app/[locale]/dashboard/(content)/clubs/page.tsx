"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { useClubs } from "@/hooks/clubs";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { useClubActions } from "@/hooks/dashboard/clubs";
import { DataColumn } from "@/types/table";
import { ClubListItem } from "@/types/club/responses";
import Image from "next/image";
import useClubFilter from "@/hooks/clubs/useClubFilter";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";

export default function ClubsManagementPage() {
  const tListPage = useTranslations("common.pages.list");
  const tCommon = useTranslations("common");

  const tColumn = useTranslations("dashboard.clubs.columns");
  const tEntities = useTranslations("entities");

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
        <div className="flex items-center gap-3">
          <Image
            src={club.imageUrl}
            alt={club.name}
            width={32}
            height={32}
            className="size-8 object-contain"
          />

          <span>{club.name}</span>
        </div>
      ),

      sortable: true,
    },

    {
      key: "nation",
      label: tColumn("nation"),
      className: "min-w-[200px]",

      render: (club) =>
        club.nation ? (
          <div className="flex items-center gap-3">
            <Image
              src={club.nation.imageUrl}
              alt={club.nation.name}
              width={32}
              height={32}
              className="size-8 object-contain"
            />

            <span>{club.nation.name}</span>
          </div>
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
      title={tListPage("title", {
        entity: tEntities("club"),
      })}
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
