"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudFormTablePage } from "@/components/templates/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCrudFilterSync } from "@/hooks/crud";
import {
  useCompetitionCategories,
  useCompetitionCategoryData,
} from "@/hooks/dashboard/competition-categories";
import useCompetitionCategoryFilter from "@/hooks/dashboard/competition-categories/useCompetitionCategoryFilter";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { CompetitionCategoryListItem } from "@/types/competition-category";
import { DataColumn } from "@/types/table";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("dashboard.competitionCategories");
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.competitionCategories.columns");
  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    useCompetitionCategoryFilter();

  const { competitionCategories, loading, retrying, loadError, retryLoad } =
    useCompetitionCategories({
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
    handleDelete,
    resetForm,
  } = useCompetitionCategoryData();

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
    setFilters,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

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
        onSearchChange: (value) => setFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
