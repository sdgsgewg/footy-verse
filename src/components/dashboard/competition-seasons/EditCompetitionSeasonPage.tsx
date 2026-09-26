"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { CompetitionLookupResponse } from "@/types/competition";
import { useCompetitionDetail } from "@/hooks/dashboard/competitions";
import { useRouter } from "@/navigation";
import {
  useCompetitionSeasonEdit,
  useCompetitionSeasons,
  useCompetitionSeasonSubmit,
} from "@/hooks/dashboard/competition-seasons";
import { CompetitionSeasonLookupResponse } from "@/types/competition-season";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { CompetitionSeasonHistoryTable } from "@/components/competitions/table";
import CompetitionSeasonForm from "@/components/forms/competition-seasons/CompetitionSeasonForm";
import { ENTITY_CONFIG } from "@/config/entities";

interface Props {
  competitionLookup: CompetitionLookupResponse;
  competitionSeasonLookup: CompetitionSeasonLookupResponse;
}

export default function EditCompetitionSeasonPage({
  competitionLookup,
  competitionSeasonLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { competition } = useCompetitionDetail(competitionLookup.id);

  const { competitionSeason, isLoading, error, refetch } =
    useCompetitionSeasonEdit({
      competitionId: competitionLookup.id,
      competitionSeasonId: competitionSeasonLookup.id,
    });

  const { competitionSeasons } = useCompetitionSeasons({
    competitionId: competitionLookup.id,
  });

  const { submit, isSubmitting } =
    useCompetitionSeasonSubmit(competitionLookup);

  if (!competition && isLoading) {
    return <EntityLoading entity="competitionSeason" />;
  }

  if (!competition && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!competition) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!competitionSeason && isLoading) {
    return <EntityLoading entity="competitionSeason" />;
  }

  if (!competitionSeason && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!competitionSeason) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("edit", "competitionSeason", `${competition.name}`)}
      columns={1}
      tableTitle="Season History"
      table={
        <CompetitionSeasonHistoryTable
          competitionLookup={competitionLookup}
          competitionSeasons={competitionSeasons}
        />
      }
      form={
        <CompetitionSeasonForm
          mode="edit"
          competitionSeason={competitionSeason}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              competitionSeasonId: competitionSeason.id,
              payload,
              onSuccess: () => {
                router.push(
                  `${ENTITY_CONFIG["competition"]["dashboardRoute"]}/${competitionLookup.slug}`,
                );
              },
            })
          }
        />
      }
      backHref={`${ENTITY_CONFIG["competition"]["dashboardRoute"]}/${competitionLookup.slug}`}
    />
  );
}
