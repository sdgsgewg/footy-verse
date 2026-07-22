"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader, CrudPageTable } from "@/components/templates/crud";
import CrudPageManagement from "@/components/templates/crud/CrudPageManagement";
import { useClubActions } from "@/hooks/dashboard/clubs/useClubActions";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudColumn, CrudRow } from "@/types/crud";
import { useTranslations } from "next-intl";
import { useClubs } from "@/hooks/clubs";

export default function ClubsManagementPage() {
  const t = useTranslations("common.pages.list");
  const tEntities = useTranslations("entities");

  const { clubs, loading, retrying, loadError, retryLoad } = useClubs();

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useClubActions();
    
  const columns: CrudColumn[] = [{ key: "name", label: t("columns.name") }];

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
      <CrudPageHeader
        title={t("title", {
          entity: tEntities("club"),
        })}
      />
      {headerContent}

      <CrudPageManagement onCreate={handleCreate} loading={loading} />

      <CrudPageTable
        loading={loading}
        data={clubs as CrudRow[]}
        columns={columns}
        onView={handleView as unknown as (item: CrudRow) => void}
        onEdit={handleEdit as unknown as (item: CrudRow) => void}
        onDelete={handleDelete as unknown as (item: CrudRow) => void}
      />
    </DashboardPageWrapper>
  );
}
