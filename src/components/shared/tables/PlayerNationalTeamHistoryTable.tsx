"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { usePlayerNationalTeamActions } from "@/hooks/dashboard/player-national-teams/usePlayerNationalTeamActions";
import { PlayerNationalTeamListItem } from "@/types/player-national-teams";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";

interface Props {
  playerNationalTeams: PlayerNationalTeamListItem[];
  showActions?: boolean;
}

const PlayerNationalTeamHistoryTable = ({
  playerNationalTeams,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const tColumn = useTranslations("dashboard.playerNationalTeams.columns");

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerNationalTeamActions(playerSlug);

  const columns: DataColumn<PlayerNationalTeamListItem>[] = [
    {
      key: "name",
      label: tColumn("nationalTeam"),
      className: "min-w-[320px]",

      render: (team) => (
        <div className="flex items-center gap-3">
          <Image
            src={team.imageUrl}
            alt={team.name}
            width={32}
            height={32}
            className="size-8 object-contain"
          />

          <span>{team.name}</span>
        </div>
      ),
    },

    {
      key: "shirtNumber",
      label: tColumn("shirtNumber"),
    },

    {
      key: "startDate",
      label: tColumn("startDate"),

      render: (team) => formatDate(team.startDate, locale),
    },

    {
      key: "endDate",
      label: tColumn("endDate"),

      render: (team) => (team.endDate ? formatDate(team.endDate, locale) : "-"),
    },
  ];

  return (
    <DataTable
      data={playerNationalTeams}
      columns={columns}
      showActions
      onView={
        showActions
          ? (pnt: PlayerNationalTeamListItem) => handleView(pnt.id)
          : undefined
      }
      onEdit={
        showActions
          ? (pnt: PlayerNationalTeamListItem) => handleEdit(pnt.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default PlayerNationalTeamHistoryTable;
