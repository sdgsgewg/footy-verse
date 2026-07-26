"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { PlayerNationalTeamCareerListItem } from "@/types/player-national-team-career";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";
import { usePlayerNationalTeamCareerActions } from "@/hooks/dashboard/player-national-teams/usePlayerNationalTeamCareerActions";

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
    "dashboard.playerNationalTeamCareers.columns",
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
      key: "joinedAt",
      label: tColumn("joinedAt"),

      render: (team) => formatDate(team.joinedAt, locale),
    },

    {
      key: "leftAt",
      label: tColumn("leftAt"),

      render: (team) => (team.leftAt ? formatDate(team.leftAt, locale) : "-"),
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
