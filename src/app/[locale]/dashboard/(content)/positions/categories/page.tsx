"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";

import { CrudFormTablePage } from "@/components/templates/crud";

import { DataColumn } from "@/types/table";
import { PositionCategoryListItem } from "@/types/position-category";

import { createSortHandler } from "@/lib/utils/crud";
import { useFilterSync } from "@/hooks/filter";

import usePositionCategoryFilter from "@/hooks/position-categories/usePositionCategoryFilter";

import {
  usePositionCategories,
  usePositionCategoryActions,
  usePositionCategoryForm,
  usePositionCategorySubmit,
} from "@/hooks/dashboard/position-categories";

import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";

import PositionCategoryForm from "@/components/forms/position-categories/PositionCategoryForm";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.positionCategories.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = usePositionCategoryFilter();

  const { positionCategories, loading, loadError, retrying, retryLoad } =
    usePositionCategories({
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    });

  const { handleReorder, handleDelete } = usePositionCategoryActions();

  const { isSubmitting, getButtonText, submit } = usePositionCategorySubmit();

  const { form, isEditing, handleEdit, resetForm } = usePositionCategoryForm({
    onSubmit: (payload) => {
      submit({
        id: form.getFieldValue("id"),
        payload,
        onSuccess: resetForm,
      });
    },
  });

  const columns: DataColumn<PositionCategoryListItem>[] = [
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
      title={getTitle("list", "positionCategory")}
      loading={loading}
      data={positionCategories}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      form={
        <PositionCategoryForm
          form={form}
          loading={isSubmitting}
          isEditing={isEditing}
          buttonText={getButtonText(isEditing)}
          resetForm={resetForm}
        />
      }
      actions={{
        onReorder: handleReorder,
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
