"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { PlayerNationalTeamCareerListItem } from "@/types/player-national-team-career";
import { DataColumn } from "@/types/table";
import { usePlayerNationalTeamCareerActions } from "@/hooks/dashboard/player-national-teams/usePlayerNationalTeamCareerActions";
import { DataTable } from "@/components/shared/tables/DataTable";
import { ImageLabel } from "@/components/shared/ImageLabel";

interface Props {
  playerNationalTeamCareers: PlayerNationalTeamCareerListItem[];
  showActions?: boolean;
}

const PlayerNationalTeamCareerHistoryTable = ({
  playerNationalTeamCareers,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const tColumn = useTranslations(
    "dashboard.playerNationalTeamCareers.table.columns",
  );

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerNationalTeamCareerActions(playerSlug);

  const columns: DataColumn<PlayerNationalTeamCareerListItem>[] = [
    {
      key: "name",
      label: tColumn("nationalTeam"),
      className: "min-w-[320px]",

      render: (team) => (
        <ImageLabel imageUrl={team.imageUrl} label={team.name} />
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
      showActions
      onView={
        showActions
          ? (pnt: PlayerNationalTeamCareerListItem) => handleView(pnt.id)
          : undefined
      }
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
