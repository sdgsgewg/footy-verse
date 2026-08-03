"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { useParams } from "next/navigation";
import { usePlayerClubCareerActions } from "@/hooks/dashboard/player-club-careers/usePlayerClubCareerActions";
import { PlayerClubCareerListItem } from "@/types/player-club-career";
import { DataColumn } from "@/types/table";
import { DataTable } from "../../shared/tables/DataTable";
import { ClubImageLabel } from "@/components/shared/tables/cells";

interface Props {
  playerClubCareers: PlayerClubCareerListItem[];
  loading?: boolean;
  showActions?: boolean;
}

const PlayerClubCareerHistoryTable = ({
  playerClubCareers,
  loading,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const tColumn = useTranslations("dashboard.playerClubCareers.table.columns");

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerClubCareerActions(playerSlug);

  const columns: DataColumn<PlayerClubCareerListItem>[] = [
    {
      key: "name",
      label: tColumn("club"),
      className: "min-w-[320px]",

      render: (team) => (
        <ClubImageLabel imageUrl={team.imageUrl} label={team.name} />
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
      loading={loading}
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
