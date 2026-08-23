"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudFormTablePage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import usePositionCategoryFilter from "@/hooks/position-categories/usePositionCategoryFilter";
import {
  usePositionCategories,
  usePositionCategoryActions,
  usePositionCategoryForm,
  usePositionCategorySubmit,
} from "@/hooks/dashboard/position-categories";
import { PositionCategoryListItem } from "@/types/position-category";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

export default function Page() {
  const t = useTranslations("dashboard.positionCategories");
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

  const {
    form,
    setForm,
    isEditing,
    canSubmit,
    handleEdit,
    buildPayload,
    resetForm,
  } = usePositionCategoryForm();

  const { handleReorder, handleDelete } = usePositionCategoryActions();

  const { isSubmitting, getButtonText, submit } = usePositionCategorySubmit();

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
  useCrudFilterSync(debouncedFilters, syncUrl);

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
      form={{
        formFields: [
          {
            name: "name",
            label: t("form.labels.name"),
            placeholder: t("form.placeholders.name"),
            type: "text",
            required: true,
          },
        ],
        form,
        setForm,
        canSubmit,
        onSubmit: () => {
          submit({
            id: isEditing ? form.id : undefined,
            payload: buildPayload(),
            onSuccess: resetForm,
          });
        },
        isEditing,
        isSubmitting,
        buttonText: getButtonText(isEditing),
        resetForm,
      }}
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
