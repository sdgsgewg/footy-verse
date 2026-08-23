"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudFormTablePage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCrudFilterSync } from "@/hooks/crud";
import {
  useCompetitionScopeActions,
  useCompetitionScopeData,
  useCompetitionScopes,
} from "@/hooks/dashboard/competition-scopes";
import useCompetitionScopeFilter from "@/hooks/dashboard/competition-scopes/useCompetitionScopeFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { CompetitionScopeListItem } from "@/types/competition-scope";
import { DataColumn } from "@/types/table";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("dashboard.competitionScopes");
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.competitionScopes.columns");
  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = useCompetitionScopeFilter();

  const { competitionScopes, loading, retrying, loadError, retryLoad } =
    useCompetitionScopes({
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
  } = useCompetitionScopeData();

  const { handleDelete } = useCompetitionScopeActions();

  const columns: DataColumn<CompetitionScopeListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",
      sortable: true,
    },
    {
      key: "description",
      label: tColumn("description"),
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudFormTablePage
      title={getTitle("list", "competitionScope")}
      loading={loading}
      data={competitionScopes}
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
            required: true,
          },
          {
            name: "description",
            label: t("form.labels.description"),
            placeholder: t("form.placeholders.description"),
            type: "text",
            required: false,
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
