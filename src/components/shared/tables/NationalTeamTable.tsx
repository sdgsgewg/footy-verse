"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getAgeGroupLabel, getTeamCategoryLabel } from "@/lib/constants/labels";
import { AgeGroup } from "@/enums/AgeGroup";
import { NationalTeamListItem } from "@/types/national-team";
import { useNationalTeamActions } from "@/hooks/dashboard/national-teams";
import { TeamCategory } from "@/enums/TeamCategory";
import { DataColumn } from "@/types/table";
import { DataTable } from "./DataTable";

interface Props {
  nationalTeams: NationalTeamListItem[];
  showActions?: boolean;
}

const NationalTeamTable = ({ nationalTeams, showActions = false }: Props) => {
  const { nationSlug } = useParams() as {
    nationSlug: string;
  };

  const t = useTranslations("");
  const tColumn = useTranslations("dashboard.nationalTeams.columns");

  const { handleView, handleEdit, handleDelete } =
    useNationalTeamActions(nationSlug);

  const columns: DataColumn<NationalTeamListItem>[] = [
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
      key: "teamCategory",
      label: tColumn("teamCategory"),

      render: (team) =>
        getTeamCategoryLabel(team.teamCategory as TeamCategory, t),
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
      data={nationalTeams}
      columns={columns}
      showActions
      onView={
        showActions
          ? (team: NationalTeamListItem) => handleView(team.id)
          : undefined
      }
      onEdit={
        showActions
          ? (team: NationalTeamListItem) => handleEdit(team.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default NationalTeamTable;
