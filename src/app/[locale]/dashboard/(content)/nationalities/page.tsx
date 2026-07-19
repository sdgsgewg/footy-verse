"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudPage } from "@/components/templates/crud/CrudPage";
import {
  useNationalities,
  useNationalityActions,
  useNationalityData,
} from "@/hooks/dashboard/nationalities";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";

export default function NationalitiesManagementPage() {
  const t = useTranslations("dashboard.nationalities");

  const { nationalities, loading, retrying, loadError, retryLoad } =
    useNationalities();
  const { handleView } = useNationalityActions();
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
  } = useNationalityData();

  return (
    <CrudPage
      title={t("title")}
      formFields={[
        {
          name: "image",
          label: t("form.labels.image"),
          placeholder: t("form.labels.image"),
          type: "image",
        },
        {
          name: "name",
          label: t("form.labels.name"),
          placeholder: t("form.labels.name"),
          type: "text",
        },
      ]}
      columns={[{ key: "name", label: t("columns.name") }]}
      data={nationalities}
      form={form}
      setForm={setForm}
      canSubmit={canSubmit}
      onSubmit={handleSubmit}
      onView={handleView}
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
