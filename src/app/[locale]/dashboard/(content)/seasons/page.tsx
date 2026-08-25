"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudFormTablePage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useFilterSync } from "@/hooks/filter";
import { useSeasonActions } from "@/hooks/dashboard/seasons";
import { useSeasonData } from "@/hooks/dashboard/seasons/useSeasonData";
import { useSeasons } from "@/hooks/dashboard/seasons/useSeasons";
import useSeasonFilter from "@/hooks/seasons/useSeasonFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { SeasonListItem } from "@/types/season";
import { DataColumn } from "@/types/table";
import { useTranslations } from "next-intl";

export default function SeasonsManagementPage() {
  const t = useTranslations("dashboard.seasons");
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.positions.columns");
  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = useSeasonFilter();

  const { seasons, loading, retrying, loadError, retryLoad } = useSeasons({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const {
    isEditing,
    buttonText,
    isSubmitting,
    form,
    setForm,
    canSubmit,
    handleSubmit,
    handleEdit,
    resetForm,
  } = useSeasonData();

  const { handleDelete } = useSeasonActions();

  const columns: DataColumn<SeasonListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",
      sortable: true,
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial,
  });

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudFormTablePage
      title={getTitle("list", "season")}
      loading={loading}
      data={seasons}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert onRetry={retryLoad} retrying={retrying} />
        ) : undefined
      }
      form={{
        formFields: [
          {
            name: "name",
            label: t("form.labels.name"),
            placeholder: t("form.placeholders.name"),
            type: "text",
          },
        ],
        form: form,
        setForm: setForm,
        canSubmit: canSubmit,
        onSubmit: handleSubmit,
        isEditing: isEditing,
        isSubmitting: isSubmitting,
        buttonText: buttonText,
        resetForm: resetForm,
      }}
      actions={{
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => updateFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
