"use client";

import { createPlayerColumns } from "@/components/dashboard/players/columns/player-columns";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudListPage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCrudFilterSync } from "@/hooks/crud";
import { usePlayers } from "@/hooks/dashboard/players";
import { usePlayerActions } from "@/hooks/dashboard/players/usePlayerActions";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.players.table.columns");

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

  const columns = createPlayerColumns(
    {
      player: tColumn("player"),
      dob: tColumn("dob"),
      club: tColumn("club"),
      nationality: tColumn("nationality"),
      marketValue: tColumn("marketValue"),
    },
    ["shirtNumber", "player", "dob", "club", "nationality", "marketValue"],
  );

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
