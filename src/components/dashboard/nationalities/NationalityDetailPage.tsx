"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import NationalTeamDetailPageLayout from "@/components/layout/detail-page/NationalTeamDetailPageLayout";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { NationalityLookupResponse } from "@/types/nationality";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const NationalityDetailPage = ({ nationalityLookup }: Props) => {
  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationalityLookup.id,
  );

  // Initial request is still loading and no cached nationality data is available yet.
  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  // Initial request failed before any nationality data could be loaded.
  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no nationality data is available even though loading has finished.
  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { imageUrl, name } = nationality;

  return (
    <NationalTeamDetailPageLayout
      title={name}
      imageUrl={imageUrl}
      nationalTeam={nationality}
    />
  );
};

export default NationalityDetailPage;
