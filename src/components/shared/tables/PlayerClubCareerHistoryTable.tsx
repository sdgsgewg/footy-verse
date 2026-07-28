"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { usePlayerClubCareerActions } from "@/hooks/dashboard/player-club-careers/usePlayerClubCareerActions";
import { PlayerClubCareerListItem } from "@/types/player-club-career";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";

interface Props {
  playerClubCareers: PlayerClubCareerListItem[];
  showActions?: boolean;
}

const PlayerClubCareerHistoryTable = ({
  playerClubCareers,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const tColumn = useTranslations("dashboard.playerClubCareers.columns");

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerClubCareerActions(playerSlug);

  const columns: DataColumn<PlayerClubCareerListItem>[] = [
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
      data={playerClubCareers}
      columns={columns}
      showActions
      onView={
        showActions
          ? (pc: PlayerClubCareerListItem) => handleView(pc.id)
          : undefined
      }
      onEdit={
        showActions
          ? (pc: PlayerClubCareerListItem) => handleEdit(pc.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default PlayerClubCareerHistoryTable;
