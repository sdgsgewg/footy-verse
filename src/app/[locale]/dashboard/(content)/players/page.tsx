"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { ImageLabel } from "@/components/shared/ImageLabel";
import { CrudListPage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCrudFilterSync } from "@/hooks/crud";
import { usePlayers } from "@/hooks/dashboard/players";
import { usePlayerActions } from "@/hooks/dashboard/players/usePlayerActions";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { PlayerListItem } from "@/types/player";
import { DataColumn } from "@/types/table";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.players.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    setFilter,
    setFilters,
    goToPage,
    syncUrl,
  } = usePlayerFilter();

  const {
    players,
    limit,
    totalPages,
    total,
    loading,
    retrying,
    loadError,
    retryLoad,
  } = usePlayers({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    usePlayerActions();

  const columns: DataColumn<PlayerListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[16rem]",

      render: (player) => (
        <ImageLabel imageUrl={player.imageUrl} label={player.name} />
      ),

      sortable: true,
    },

    {
      key: "mainPosition",
      label: tColumn("position"),
      className: "min-w-[10rem]",
      render: (player) => player.mainPosition.name,
    },

    {
      key: "currentClubTeam",
      label: tColumn("club"),
      className: "min-w-[12rem]",

      render: (player) => (
        <>
          {player.currentClubTeam ? (
            <ImageLabel
              imageUrl={player.currentClubTeam.imageUrl}
              label={player.currentClubTeam.name}
            />
          ) : (
            <span>{`-`}</span>
          )}
        </>
      ),
    },

    {
      key: "currentNationality",
      label: tColumn("nationality"),
      className: "min-w-[14rem]",

      render: (player) => (
        <>
          {player.currentNationality ? (
            <ImageLabel
              imageUrl={player.currentNationality.imageUrl}
              label={player.currentNationality.name}
            />
          ) : (
            <span>{`-`}</span>
          )}
        </>
      ),
    },

    {
      key: "marketValue",
      label: tColumn("marketValue"),
      render: (player) => player.marketValue,
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
      title={getTitle("list", "player")}
      loading={loading}
      data={players}
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
