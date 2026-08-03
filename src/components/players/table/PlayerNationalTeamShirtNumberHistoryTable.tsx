"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { DataColumn } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";
import { ClubImageLabel } from "@/components/shared/tables/cells";
import { PlayerNationalTeamShirtNumberListItem } from "@/types/player-shirt-number";

interface Props {
  playerNationalTeamShirtNumbers: PlayerNationalTeamShirtNumberListItem[];
}

const PlayerNationalTeamShirtNumberHistoryTable = ({
  playerNationalTeamShirtNumbers,
}: Props) => {
  const tColumn = useTranslations("dashboard.playerShirtNumbers.table.columns");

  const locale = useLocale();

  const columns: DataColumn<PlayerNationalTeamShirtNumberListItem>[] = [
    {
      key: "nationalTeam",
      label: tColumn("nationalTeam"),

      render: (psn) => (
        <ClubImageLabel
          imageUrl={psn.nationalTeam.imageUrl}
          label={psn.nationalTeam.name}
        />
      ),
    },

    {
      key: "shirtNumber",
      label: tColumn("shirtNumber"),
      render: (psn) => psn.shirtNumber,
    },

    {
      key: "startDate",
      label: tColumn("startDate"),
      render: (psn) => formatLocaleDate(psn.startDate, locale),
    },

    {
      key: "endDate",
      label: tColumn("endDate"),
      render: (psn) =>
        psn.endDate ? formatLocaleDate(psn.endDate, locale) : "-",
    },
  ];

  return <DataTable data={playerNationalTeamShirtNumbers} columns={columns} />;
};

export default PlayerNationalTeamShirtNumberHistoryTable;
