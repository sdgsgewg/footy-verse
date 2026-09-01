"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudListPage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useFilterSync } from "@/hooks/filter";
import {
  useCompetitionActions,
  useCompetitions,
} from "@/hooks/dashboard/competitions";
import useCompetitionFilter from "@/hooks/dashboard/competitions/useCompetitionFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { CompetitionFilter } from "@/types/competition";
import { useTranslations } from "next-intl";
import CompetitionFilterContent from "@/components/dashboard/competitions/CompetitionFilterContent";
import { useCrudFilterDialog } from "@/hooks/crud/useCrudFilterDialog";
import { createCompetitionColumns } from "@/components/dashboard/competitions/columns/competition-columns";

export default function PlayersManagementPage() {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.competitions.columns");

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
  } = useCompetitionFilter();

  const {
    filterOpen,
    setFilterOpen,
    draftFilters,
    updateDraftFilter,
    openFilter,
    applyFilter,
    resetFilter,
  } = useCrudFilterDialog<CompetitionFilter>(
    filters,
    updateFiltersPartial,
    defaultFilters,
  );

  const {
    competitions,
    limit,
    totalPages,
    total,
    loading,
    retrying,
    loadError,
    retryLoad,
  } = useCompetitions({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useCompetitionActions();

  const columns = createCompetitionColumns(
    {
      name: tColumn("name"),
      category: tColumn("category"),
      scope: tColumn("scope"),
      participantType: tColumn("participant"),
      gender: tColumn("gender"),
      location: tColumn("location"),
    },
    t,
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
      title={getTitle("list", "competition")}
      loading={loading}
      data={competitions}
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
          <CompetitionFilterContent
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
