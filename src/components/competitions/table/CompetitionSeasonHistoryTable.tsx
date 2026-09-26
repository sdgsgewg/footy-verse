"use client";

import { DataTable } from "@/components/shared/tables/DataTable";
import { useCompetitionSeasonActions } from "@/hooks/dashboard/competition-seasons";
import { formatLocaleDate } from "@/lib/utils/date";
import { CompetitionLookupResponse } from "@/types/competition";
import { CompetitionSeasonListItem } from "@/types/competition-season";
import { DataColumn } from "@/types/table";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  competitionLookup: CompetitionLookupResponse;
  competitionSeasons: CompetitionSeasonListItem[];
  loading?: boolean;
  showActions?: boolean;
}

const CompetitionSeasonHistoryTable = ({
  competitionLookup,
  competitionSeasons,
  loading,
  showActions = false,
}: Props) => {
  const tColumn = useTranslations("dashboard.competitionSeasons.table.columns");

  const locale = useLocale();

  const { handleEdit, handleDelete } =
    useCompetitionSeasonActions(competitionLookup);

  const columns: DataColumn<CompetitionSeasonListItem>[] = [
    {
      key: "label",
      label: tColumn("season"),
      className: "min-w-[320px]",
      sortable: true,

      render: (season) => <span>{season.label}</span>,
    },

    {
      key: "startDate",
      label: tColumn("startDate"),
      sortable: true,

      render: (season) => formatLocaleDate(season.startDate, locale),
    },

    {
      key: "endDate",
      label: tColumn("endDate"),
      sortable: true,

      render: (season) =>
        season.endDate ? formatLocaleDate(season.endDate, locale) : "-",
    },

    {
      key: "status",
      label: tColumn("status"),
      sortable: true,

      render: (season) => <span>{season.status}</span>,
    },

    {
      key: "winner",
      label: tColumn("winner"),
      sortable: true,

      render: (season) => (
        <span>{season.winner ? season.winner.name : "-"}</span>
      ),
    },
  ];

  return (
    <DataTable
      data={competitionSeasons}
      columns={columns}
      loading={loading}
      showActions
      onEdit={
        showActions
          ? (competitionSeason: CompetitionSeasonListItem) =>
              handleEdit(competitionSeason.id)
          : undefined
      }
      onDelete={showActions ? handleDelete : undefined}
    />
  );
};

export default CompetitionSeasonHistoryTable;
