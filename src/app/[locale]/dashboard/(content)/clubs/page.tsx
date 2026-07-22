"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { useClubActions } from "@/hooks/dashboard/clubs/useClubActions";
import { useClubs } from "@/hooks/clubs";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudColumn } from "@/types/crud";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";

export default function ClubsManagementPage() {
  const t = useTranslations("common.pages.list");
  const tEntities = useTranslations("entities");

  const { clubs, loading, retrying, loadError, retryLoad } = useClubs();

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useClubActions();

  const columns: CrudColumn[] = [
    {
      key: "name",
      label: t("columns.name"),
    },
  ];

  return (
    <CrudListPage
      title={t("title", {
        entity: tEntities("club"),
      })}
      loading={loading}
      data={clubs}
      columns={columns}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
    />
  );
}
