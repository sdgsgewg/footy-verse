"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { PlayerNationalTeamCareerListItem } from "@/types/player-national-team-career";
import { DataColumn } from "@/types/table";
import { usePlayerNationalTeamCareerActions } from "@/hooks/dashboard/player-national-teams/usePlayerNationalTeamCareerActions";
import { DataTable } from "@/components/shared/tables/DataTable";
import { NationalityImageLabel } from "@/components/shared/tables/cells";
import { PlayerLookupResponse } from "@/types/player";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerNationalTeamCareers: PlayerNationalTeamCareerListItem[];
  loading?: boolean;
  showActions?: boolean;
}

const PlayerNationalTeamCareerHistoryTable = ({
  playerLookup,
  playerNationalTeamCareers,
  loading,
  showActions = false,
}: Props) => {
  const tColumn = useTranslations(
    "dashboard.playerNationalTeamCareers.table.columns",
  );

  const locale = useLocale();

  const { handleEdit, handleDelete } =
    usePlayerNationalTeamCareerActions(playerLookup);

  const columns: DataColumn<PlayerNationalTeamCareerListItem>[] = [
    {
      key: "name",
      label: tColumn("nationalTeam"),
      className: "min-w-[320px]",

      render: (team) => (
        <NationalityImageLabel imageUrl={team.imageUrl} label={team.name} />
      ),
    },

    {
      key: "joinedAt",
      label: tColumn("joinedAt"),

      render: (team) => formatLocaleDate(team.joinedAt, locale),
    },

    {
      key: "leftAt",
      label: tColumn("leftAt"),

      render: (team) =>
        team.leftAt ? formatLocaleDate(team.leftAt, locale) : "-",
    },
  ];

  return (
    <DataTable
      data={playerNationalTeamCareers}
      columns={columns}
      loading={loading}
      showActions
      onEdit={
        showActions
          ? (pnt: PlayerNationalTeamCareerListItem) => handleEdit(pnt.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default PlayerNationalTeamCareerHistoryTable;
