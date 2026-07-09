"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CrudPageHeader, CrudPageTable } from "@/components/templates/crud";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { usePlayers } from "@/hooks/manage/players";
import { usePlayerActions } from "@/hooks/manage/players/usePlayerActions";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { CrudColumn, CrudRow } from "@/types/crud";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const t = useTranslations("manage.players");

  const { players, loading, retrying, loadError, retryLoad } = usePlayers();
  const { handleCreate, handleView, handleEdit, handleDelete } =
    usePlayerActions();

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
    <div className="space-y-8">
      <CrudPageHeader title={t("title")} />
      {headerContent}

      {/* Add Button */}
      <div>
        <Button
          variant="default"
          size="lg"
          onClick={handleCreate}
          disabled={loading}
          className="flex-1"
        >
          <PlusCircle className="w-4 h-4" />
          {`Add`}
        </Button>
      </div>

      {/* TABLE SECTION */}
      <div className="">
        {loading ? (
          <div className="">
            <TableSkeleton columnCount={columns.length} rowCount={5} />
          </div>
        ) : (
          <CrudPageTable
            data={players as CrudRow[]}
            columns={columns}
            onView={handleView as unknown as (item: CrudRow) => void}
            onEdit={handleEdit as unknown as (item: CrudRow) => void}
            onDelete={handleDelete as unknown as (item: CrudRow) => void}
          />
        )}
      </div>
    </div>
  );
}
