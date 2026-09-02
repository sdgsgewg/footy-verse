"use client";

import { useTranslations } from "next-intl";
import { getAgeGroupLabel, getGenderLabel } from "@/lib/constants/labels";
import { AgeGroup } from "@/enums/AgeGroup";
import { NationalTeamListItem } from "@/types/national-team";
import { useNationalTeamActions } from "@/hooks/dashboard/national-teams";
import { DataColumn } from "@/types/table";
import { DataTable } from "../../../shared/tables/DataTable";
import { Gender } from "@/enums/Gender";
import { getNationalTeamTypeLabel } from "@/lib/national-teams/labels";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { NationalityImageLabel } from "@/components/shared/tables/cells";
import { NationalityLookupResponse } from "@/types/nationality";

interface Props {
  nationalityLookup: NationalityLookupResponse;
  nationalTeams: NationalTeamListItem[];
  showActions?: boolean;
}

const NationalTeamTable = ({
  nationalityLookup,
  nationalTeams,
  showActions = false,
}: Props) => {
  const t = useTranslations("");
  const tColumn = useTranslations("dashboard.nationalTeams.table.columns");

  const { handleView, handleEdit, handleDelete } =
    useNationalTeamActions(nationalityLookup);

  const columns: DataColumn<NationalTeamListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[320px]",

      render: (team) => (
        <NationalityImageLabel imageUrl={team.imageUrl} label={team.name} />
      ),
    },

    {
      key: "gender",
      label: tColumn("gender"),

      render: (team) => getGenderLabel(team.gender as Gender, t),
    },

    {
      key: "ageGroup",
      label: tColumn("ageGroup"),

      render: (team) =>
        team.ageGroup ? getAgeGroupLabel(team.ageGroup as AgeGroup, t) : "-",
    },

    {
      key: "teamType",
      label: tColumn("teamType"),

      render: (team) =>
        team.teamType
          ? getNationalTeamTypeLabel(team.teamType as NationalTeamType, t)
          : "-",
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
