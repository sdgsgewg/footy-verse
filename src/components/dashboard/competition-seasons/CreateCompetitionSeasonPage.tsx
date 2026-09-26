"use client";

import { useCompetitionDetail } from "@/hooks/dashboard/competitions";
import { CompetitionLookupResponse } from "@/types/competition";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useCompetitionSeasonSubmit } from "@/hooks/dashboard/competition-seasons";
import CompetitionSeasonForm from "@/components/forms/competition-seasons/CompetitionSeasonForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { useCompetitionSeasons } from "@/hooks/dashboard/competition-seasons";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { CompetitionSeasonHistoryTable } from "@/components/competitions/table";
import { useRouter } from "@/navigation";
import { ENTITY_CONFIG } from "@/config/entities";

interface Props {
  competitionLookup: CompetitionLookupResponse;
}

export default function CreateCompetitionSeasonPage({
  competitionLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { competition, isLoading, error, refetch } = useCompetitionDetail(
    competitionLookup.id,
  );

  const { competitionSeasons } = useCompetitionSeasons({
    competitionId: competition?.id,
  });

  const { submit, isSubmitting } =
    useCompetitionSeasonSubmit(competitionLookup);

  // Initial request is still loading and no cached competition data is available yet.
  if (!competition && isLoading) {
    return <EntityLoading entity="competition" />;
  }

  // Initial request failed before any competition data could be loaded.
  if (!competition && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no competition data is available even though loading has finished.
  if (!competition) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("create", "competitionSeason", `${competition.name}`)}
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
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(
                  `${ENTITY_CONFIG["competition"]["dashboardRoute"]}/${competition.slug}`,
                );
              },
            })
          }
        />
      }
      backHref={`${ENTITY_CONFIG["competition"]["dashboardRoute"]}/${competition.slug}`}
    />
  );
}
