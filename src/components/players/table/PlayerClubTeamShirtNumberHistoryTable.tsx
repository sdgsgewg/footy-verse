"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { DataColumn } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";
import { ClubImageLabel } from "@/components/shared/tables/cells";
import { PlayerClubTeamShirtNumberListItem } from "@/types/player-shirt-number";

interface Props {
  playerClubTeamShirtNumbers: PlayerClubTeamShirtNumberListItem[];
}

const PlayerClubTeamShirtNumberHistoryTable = ({
  playerClubTeamShirtNumbers,
}: Props) => {
  const tColumn = useTranslations("dashboard.playerShirtNumbers.table.columns");

  const locale = useLocale();

  const columns: DataColumn<PlayerClubTeamShirtNumberListItem>[] = [
    {
      key: "clubTeam",
      label: tColumn("clubTeam"),

      render: (psn) => (
        <ClubImageLabel
          imageUrl={psn.clubTeam.imageUrl}
          label={psn.clubTeam.name}
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

  return <DataTable data={playerClubTeamShirtNumbers} columns={columns} />;
};

export default PlayerClubTeamShirtNumberHistoryTable;
