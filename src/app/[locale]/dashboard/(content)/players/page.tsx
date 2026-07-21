"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader, CrudPageTable } from "@/components/templates/crud";
import CrudPageManagement from "@/components/templates/crud/CrudPageManagement";
import { usePlayers } from "@/hooks/dashboard/players";
import { usePlayerActions } from "@/hooks/dashboard/players/usePlayerActions";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudColumn, CrudRow } from "@/types/crud";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const t = useTranslations("dashboard.players");

  const { players, loading, retrying, loadError, retryLoad } = usePlayers();
  const { handleCreate, handleView, handleEdit, handleDelete } =
    usePlayerActions();

  const columns: CrudColumn[] = [
    { key: "name", label: t("columns.name") },
    { key: "currentClub.name", label: t("columns.club") },
    { key: "currentNationality.name", label: t("columns.nationality") },
  ];

  const headerContent = isLikelyConnectionError(loadError) ? (
    <ConnectionErrorAlert
      onRetry={() => {
        retryLoad();
      }}
      retrying={retrying}
    />
  ) : undefined;

  return (
    <DashboardPageWrapper>
      <CrudPageHeader title={t("title")} />
      {headerContent}

      <CrudPageManagement onCreate={handleCreate} loading={loading} />

      <CrudPageTable
        loading={loading}
        data={players as CrudRow[]}
        columns={columns}
        onView={handleView as unknown as (item: CrudRow) => void}
        onEdit={handleEdit as unknown as (item: CrudRow) => void}
        onDelete={handleDelete as unknown as (item: CrudRow) => void}
      />
    </DashboardPageWrapper>
  );
}
