"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader, CrudPageTable } from "@/components/templates/crud";
import CrudPageManagement from "@/components/templates/crud/CrudPageManagement";
import { useClubs } from "@/hooks/manage/clubs";
import { useClubActions } from "@/hooks/manage/clubs/useClubActions";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudColumn, CrudRow } from "@/types/crud";
import { useTranslations } from "next-intl";

export default function ClubsManagementPage() {
  const t = useTranslations("manage.clubs");

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
    <ManagePageWrapper>
      <CrudPageHeader title={t("title")} />
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
    </ManagePageWrapper>
  );
}
