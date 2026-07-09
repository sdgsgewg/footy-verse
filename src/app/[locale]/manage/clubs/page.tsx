"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudPage } from "@/components/templates/crud/CrudPage";
import { useClubData } from "@/hooks/manage/clubs/useClubData";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { useTranslations } from "next-intl";

export default function ClubsManagementPage() {
  const t = useTranslations("manage.clubs");

  const {
    clubs,
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
  } = useClubData();

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
      data={clubs}
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
