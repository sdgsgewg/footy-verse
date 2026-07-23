"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { usePlayerCareerActions } from "@/hooks/dashboard/player-careers/usePlayerCareerActions";
import { PlayerCareerListItem } from "@/types/player-career";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";

interface Props {
  playerCareers: PlayerCareerListItem[];
  showActions?: boolean;
}

const PlayerCareerHistoryTable = ({
  playerCareers,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const tColumn = useTranslations("dashboard.playerNationalTeams.columns");

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerCareerActions(playerSlug);

  const columns: DataColumn<PlayerCareerListItem>[] = [
    {
      key: "name",
      label: tColumn("club"),
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
      data={playerCareers}
      columns={columns}
      showActions
      onView={
        showActions
          ? (pc: PlayerCareerListItem) => handleView(pc.id)
          : undefined
      }
      onEdit={
        showActions
          ? (pc: PlayerCareerListItem) => handleEdit(pc.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default PlayerCareerHistoryTable;
