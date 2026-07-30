"use client";

import EntityLoading from "../feedback/loading/EntityLoading";
import ErrorState from "../feedback/ErrorState";
import { CompetitionLookupResponse } from "@/types/competition";
import { useCompetitionDetail } from "@/hooks/dashboard/competitions";
import CompetitionDetailPageLayout from "../layout/detail-page/CompetitionDetailPageLayout";

interface Props {
  competitionLookup: CompetitionLookupResponse;
  backHref?: string;
}

export default function CompetitionDetailPage({
  competitionLookup,
  backHref,
}: Props) {
  const { competition, isLoading, error, refetch } = useCompetitionDetail(
    competitionLookup.id,
  );

  if (!competition && isLoading) {
    return <EntityLoading entity="competition" />;
  }

  if (!competition && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!competition) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { name } = competition;

  return (
    <CompetitionDetailPageLayout
      title={name}
      competition={competition}
      backHref={backHref}
    />
  );
}
