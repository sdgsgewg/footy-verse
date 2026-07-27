"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
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
import Image from "next/image";

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
        <div className="flex items-center gap-3">
          <Image
            src={player.imageUrl}
            alt={player.name}
            width={32}
            height={32}
            className="size-8 object-contain"
          />

          <span>{player.name}</span>
        </div>
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
      className: "min-w-[10rem]",

      render: (player) => (
        <>
          {player.currentClubTeam ? (
            <div className="flex items-center gap-3">
              <Image
                src={player.currentClubTeam.imageUrl}
                alt={player.currentClubTeam.name}
                width={32}
                height={32}
                className="size-8 object-contain"
              />

              <span>{player.currentClubTeam.name}</span>
            </div>
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
            <div className="flex items-center gap-3">
              <Image
                src={player.currentNationality.imageUrl}
                alt={player.currentNationality.name}
                width={32}
                height={32}
                className="size-8 object-contain"
              />

              <span>{player.currentNationality.name}</span>
            </div>
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
