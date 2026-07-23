"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useClubTeamActions } from "@/hooks/dashboard/club-teams";
import { ClubTeamListItem } from "@/types/club-team";
import { getSquadTypeLabel } from "@/lib/clubs/labels";
import { SquadType } from "@/enums/SquadType";
import { getAgeGroupLabel } from "@/lib/constants/labels";
import { AgeGroup } from "@/enums/AgeGroup";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";

interface Props {
  clubTeams: ClubTeamListItem[];
  showActions?: boolean;
}

const ClubTeamTable = ({ clubTeams, showActions = false }: Props) => {
  const { clubSlug } = useParams() as {
    clubSlug: string;
  };

  const t = useTranslations("");
  const tColumn = useTranslations("dashboard.clubTeams.columns");

  const { handleView, handleEdit, handleDelete } = useClubTeamActions(clubSlug);

  const columns: DataColumn<ClubTeamListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
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
      key: "squadType",
      label: tColumn("squadType"),

      render: (team) => getSquadTypeLabel(team.squadType as SquadType, t),
    },

    {
      key: "ageGroup",
      label: tColumn("ageGroup"),

      render: (team) =>
        team.ageGroup ? getAgeGroupLabel(team.ageGroup as AgeGroup, t) : "-",
    },
  ];

  return (
    <DataTable
      data={clubTeams}
      columns={columns}
      showActions
      onView={
        showActions
          ? (team: ClubTeamListItem) => handleView(team.id)
          : undefined
      }
      onEdit={
        showActions
          ? (team: ClubTeamListItem) => handleEdit(team.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default ClubTeamTable;
