"use client";

import { CompetitionLookupResponse } from "@/types/competition";
import { CompetitionSeasonLookupResponse } from "@/types/competition-season";
import CompetitionSeasonDetailPageLayout from "@/components/layout/detail-page/CompetitionSeasonDetailPageLayout";
import { useCompetitionSeasonDetail } from "@/hooks/dashboard/competition-seasons";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";

interface Props {
  competitionLookup: CompetitionLookupResponse;
  competitionSeasonLookup: CompetitionSeasonLookupResponse;
}

const CompetitionSeasonDetailPage = ({
  competitionLookup,
  competitionSeasonLookup,
}: Props) => {
  const {
    competitionSeason,
    isLoading: isCompetitionSeasonLoading,
    error: competitionSeasonError,
    refetch: refetchCompetitionSeason,
  } = useCompetitionSeasonDetail({
    competitionId: competitionLookup.id,
    competitionSeasonId: competitionSeasonLookup.id,
  });

  if (!competitionSeason && isCompetitionSeasonLoading) {
    return <EntityLoading entity="competitionSeason" />;
  }

  if (!competitionSeason && competitionSeasonError) {
    return <ErrorState onRetry={() => void refetchCompetitionSeason()} />;
  }

  if (!competitionSeason) {
    return <ErrorState onRetry={() => void refetchCompetitionSeason()} />;
  }

  const summary = (
    <>
      <p>Summary</p>
    </>
  );

  // Player List in grid style
  const content = (
    <>
      <p>Content</p>
    </>
  );

  return (
    <CompetitionSeasonDetailPageLayout
      title={competitionSeason.label}
      summary={summary}
      content={content}
    />
  );
};

export default CompetitionSeasonDetailPage;
