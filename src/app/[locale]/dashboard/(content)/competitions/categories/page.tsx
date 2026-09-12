"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";

import { CrudFormTablePage } from "@/components/templates/crud";

import { DataColumn } from "@/types/table";
import { CompetitionCategoryListItem } from "@/types/competition-category";

import { createSortHandler } from "@/lib/utils/crud";
import { useFilterSync } from "@/hooks/filter";

import useCompetitionCategoryFilter from "@/hooks/dashboard/competition-categories/useCompetitionCategoryFilter";

import {
  useCompetitionCategories,
  useCompetitionCategoryActions,
  useCompetitionCategoryForm,
  useCompetitionCategorySubmit,
} from "@/hooks/dashboard/competition-categories";

import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";

import CompetitionCategoryForm from "@/components/forms/competition-categories/CompetitionCategoryForm";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.competitionCategories.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = useCompetitionCategoryFilter();

  const { competitionCategories, loading, retrying, loadError, retryLoad } =
    useCompetitionCategories({
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    });

  const { handleDelete } = useCompetitionCategoryActions();

  const { isSubmitting, getButtonText, submit } =
    useCompetitionCategorySubmit();

  const { form, isEditing, handleEdit, resetForm } = useCompetitionCategoryForm(
    {
      onSubmit: (payload) => {
        submit({
          id: form.getFieldValue("id"),
          payload,
          onSuccess: resetForm,
        });
      },
    },
  );

  const columns: DataColumn<CompetitionCategoryListItem>[] = [
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
      title={getTitle("list", "competitionCategory")}
      loading={loading}
      data={competitionCategories}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert onRetry={retryLoad} retrying={retrying} />
        ) : undefined
      }
      form={
        <CompetitionCategoryForm
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
