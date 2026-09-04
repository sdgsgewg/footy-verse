"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { DataColumn } from "@/types/table";
import { PlayerTransferListItem } from "@/types/player-transfer";
import { getTransferTypeLabel } from "@/lib/transfers/labels";
import { TransferType } from "@/enums/TransferType";
import { DataTable } from "@/components/shared/tables/DataTable";
import { ClubImageLabel } from "@/components/shared/tables/cells";

interface Props {
  playerTransfers: PlayerTransferListItem[];
  loading?: boolean;
}

const PlayerTransferHistoryTable = ({ playerTransfers, loading }: Props) => {
  const t = useTranslations();
  const tColumn = useTranslations("dashboard.playerTransfers.table.columns");

  const locale = useLocale();

  const columns: DataColumn<PlayerTransferListItem>[] = [
    {
      key: "season",
      label: tColumn("season"),
      render: (transfer) => transfer.season,
    },

    {
      key: "transferDate",
      label: tColumn("date"),
      render: (transfer) => formatLocaleDate(transfer.transferDate, locale),
    },

    {
      key: "fromClubTeam",
      label: tColumn("left"),

      render: (transfer) => (
        <ClubImageLabel
          imageUrl={transfer.fromClubTeam.imageUrl}
          label={transfer.fromClubTeam.name}
        />
      ),
    },

    {
      key: "toClubTeam",
      label: tColumn("join"),

      render: (transfer) => (
        <ClubImageLabel
          imageUrl={transfer.toClubTeam.imageUrl}
          label={transfer.toClubTeam.name}
        />
      ),
    },

    {
      key: "transferFee",
      label: tColumn("fee"),
      render: (transfer) => transfer.transferFee,
    },

    {
      key: "transferType",
      label: tColumn("type"),
      render: (transfer) =>
        getTransferTypeLabel(transfer.transferType as TransferType, t),
    },
  ];

  return (
    <DataTable data={playerTransfers} columns={columns} loading={loading} />
  );
};

export default PlayerTransferHistoryTable;
