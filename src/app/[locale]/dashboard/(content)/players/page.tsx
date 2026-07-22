"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudListPage } from "@/components/templates/crud";
import { usePlayers } from "@/hooks/dashboard/players";
import { usePlayerActions } from "@/hooks/dashboard/players/usePlayerActions";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudColumn } from "@/types/crud";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const t = useTranslations("common.pages.list");
  const tEntities = useTranslations("entities");

  const { players, loading, retrying, loadError, retryLoad } = usePlayers();

  const { handleCreate, handleView, handleEdit, handleDelete } =
    usePlayerActions();

  const columns: CrudColumn[] = [
    { key: "name", label: t("columns.name") },
    { key: "currentClub.name", label: t("columns.club") },
    { key: "currentNationality.name", label: t("columns.nationality") },
  ];

  return (
    <CrudListPage
      title={t("title", {
        entity: tEntities("player"),
      })}
      loading={loading}
      data={players}
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
