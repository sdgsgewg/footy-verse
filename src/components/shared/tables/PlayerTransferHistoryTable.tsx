"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";
import { PlayerTransferListItem } from "@/types/player-transfer";
import { ImageLabel } from "../ImageLabel";
import { getTransferTypeLabel } from "@/lib/transfers/labels";
import { TransferType } from "@/enums/TransferType";

interface Props {
  playerTransfers: PlayerTransferListItem[];
}

const PlayerTransferHistoryTable = ({ playerTransfers }: Props) => {
  const tColumn = useTranslations("dashboard.playerTransfers.table.columns");
  const tTransferType = useTranslations(
    "dashboard.playerClubCareers.form.options.transferType",
  );

  const locale = useLocale();

  const columns: DataColumn<PlayerTransferListItem>[] = [
    {
      key: "season",
      label: tColumn("season"),
      render: (transfer) => transfer.season.name,
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
        <ImageLabel
          imageUrl={transfer.fromClubTeam.imageUrl}
          label={transfer.fromClubTeam.name}
        />
      ),
    },

    {
      key: "toClubTeam",
      label: tColumn("join"),

      render: (transfer) => (
        <ImageLabel
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
        getTransferTypeLabel(
          transfer.transferType as TransferType,
          tTransferType,
        ),
    },
  ];

  return <DataTable data={playerTransfers} columns={columns} />;
};

export default PlayerTransferHistoryTable;
