"use client";

import {
  createPlayerColumns,
  PlayerColumnKey,
} from "@/components/dashboard/players/columns/player-columns";
import { DataTable } from "@/components/shared/tables/DataTable";
import { usePlayerActions } from "@/hooks/dashboard/players/usePlayerActions";
import { PlayerListItem } from "@/types/player";
import { useTranslations } from "next-intl";

interface Props {
  players: PlayerListItem[];
  visibleColumns?: PlayerColumnKey[];
  returnTo?: string;
}

const PlayerTable = ({ players, visibleColumns, returnTo }: Props) => {
  const tColumn = useTranslations("dashboard.players.table.columns");

  const { handleView, handleEdit, handleDelete } = usePlayerActions({
    returnTo,
  });

  const columns = createPlayerColumns(
    {
      player: tColumn("player"),
      dob: tColumn("dob"),
      club: tColumn("club"),
      nationality: tColumn("nationality"),
      marketValue: tColumn("marketValue"),
    },
    visibleColumns,
  );

  return (
    <DataTable
      data={players}
      columns={columns}
      showActions
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default PlayerTable;
