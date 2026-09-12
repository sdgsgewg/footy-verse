"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";

import { CrudFormTablePage } from "@/components/templates/crud";

import { DataColumn } from "@/types/table";
import { CompetitionScopeListItem } from "@/types/competition-scope";

import { createSortHandler } from "@/lib/utils/crud";
import { useFilterSync } from "@/hooks/filter";

import useCompetitionScopeFilter from "@/hooks/dashboard/competition-scopes/useCompetitionScopeFilter";

import {
  useCompetitionScopeActions,
  useCompetitionScopeForm,
  useCompetitionScopes,
  useCompetitionScopeSubmit,
} from "@/hooks/dashboard/competition-scopes";

import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";

import CompetitionScopeForm from "@/components/forms/competition-scopes/CompetitionScopeForm";

export default function Page() {
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

  const { handleDelete } = useCompetitionScopeActions();

  const { isSubmitting, getButtonText, submit } = useCompetitionScopeSubmit();

  const { form, isEditing, handleEdit, resetForm } = useCompetitionScopeForm({
    onSubmit: (payload) => {
      submit({
        id: form.getFieldValue("id"),
        payload,
        onSuccess: resetForm,
      });
    },
  });

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
  useFilterSync(debouncedFilters, syncUrl);

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
      form={
        <CompetitionScopeForm
          form={form}
          loading={isSubmitting}
          isEditing={isEditing}
          buttonText={getButtonText(isEditing)}
          resetForm={resetForm}
        />
      }
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
