"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatLocaleDate } from "@/lib/utils/date";
import { usePlayerClubTeamCareerActions } from "@/hooks/dashboard/player-club-team-careers";
import { PlayerClubTeamCareerListItem } from "@/types/player-club-team-career";
import { DataColumn } from "@/types/table";
import { DataTable } from "../../shared/tables/DataTable";
import { ClubImageLabel } from "@/components/shared/tables/cells";
import { PlayerLookupResponse } from "@/types/player";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerClubTeamCareers: PlayerClubTeamCareerListItem[];
  loading?: boolean;
  showActions?: boolean;
}

const PlayerClubTeamCareerHistoryTable = ({
  playerLookup,
  playerClubTeamCareers,
  loading,
  showActions = false,
}: Props) => {
  const tColumn = useTranslations(
    "dashboard.playerClubTeamCareers.table.columns",
  );

  const locale = useLocale();

  const { handleEdit, handleDelete } =
    usePlayerClubTeamCareerActions(playerLookup);

  const columns: DataColumn<PlayerClubTeamCareerListItem>[] = [
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
      data={playerClubTeamCareers}
      columns={columns}
      loading={loading}
      showActions
      onEdit={
        showActions
          ? (pc: PlayerClubTeamCareerListItem) => handleEdit(pc.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default PlayerClubTeamCareerHistoryTable;
