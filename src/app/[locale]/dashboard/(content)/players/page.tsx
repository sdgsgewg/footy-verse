"use client";

import { createPlayerColumns } from "@/components/dashboard/players/columns/player-columns";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudListPage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useFilterSync } from "@/hooks/filter";
import { usePlayerActions, usePlayers } from "@/hooks/dashboard/players";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { useTranslations } from "next-intl";
import { useCrudFilterDialog } from "@/hooks/crud/useCrudFilterDialog";
import { PlayerFilter } from "@/types/player";
import PlayerFilterContent from "@/components/dashboard/players/PlayerFilterContent";

export default function PlayersManagementPage() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.players.table.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    defaultFilters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    goToPage,
    changeLimit,
    syncUrl,
  } = usePlayerFilter();

  const {
    filterOpen,
    setFilterOpen,
    draftFilters,
    updateDraftFilter,
    openFilter,
    applyFilter,
    resetFilter,
  } = useCrudFilterDialog<PlayerFilter>(
    filters,
    updateFiltersPartial,
    defaultFilters,
  );

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

  const columns = createPlayerColumns(
    {
      player: tColumn("player"),
      dob: tColumn("dob"),
      club: tColumn("club"),
      nationality: tColumn("nationality"),
      marketValue: tColumn("marketValue"),
    },
    ["player", "dob", "club", "nationality", "marketValue"],
  );

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial,
  });

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

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
        onSearchChange: (value) => updateFilter("search", value),
        onFilter: openFilter,
      }}
      filter={{
        content: (
          <PlayerFilterContent
            filters={draftFilters}
            updateFilter={updateDraftFilter}
          />
        ),
        open: filterOpen,
        onOpenChange: setFilterOpen,
        onApply: applyFilter,
        onReset: resetFilter,
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
