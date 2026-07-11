"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudPage } from "@/components/templates/crud/CrudPage";
import { useSeasonData } from "@/hooks/manage/seasons/useSeasonData";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { useTranslations } from "next-intl";

export default function SeasonsManagementPage() {
  const t = useTranslations("manage.seasons");

  const {
    seasons,
    loading,
    retrying,
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
    loadError,
    retryLoad,
  } = useSeasonData();

  return (
    <CrudPage
      title={t("title")}
      formFields={[
        {
          name: "name",
          label: t("form.labels.name"),
          placeholder: t("form.labels.name"),
          type: "text",
        },
      ]}
      columns={[{ key: "name", label: t("columns.name") }]}
      data={seasons}
      form={form}
      setForm={setForm}
      canSubmit={canSubmit}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      buttonText={buttonText}
      resetForm={resetForm}
      loading={loading}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert onRetry={retryLoad} retrying={retrying} />
        ) : undefined
      }
    />
  );
}
