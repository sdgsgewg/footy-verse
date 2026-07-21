"use client";

import EntityLoading from "@/components/feedback/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubDetailPage = ({ clubLookup }: Props) => {
  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  // Initial request is still loading and no cached club data is available yet.
  if (!club && isLoading) {
    return <EntityLoading entity="club" />;
  }

  // Initial request failed before any club data could be loaded.
  if (!club && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no club data is available even though loading has finished.
  if (!club) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { name } = club;

  // Player List in table style
  const content = <></>;

  return <ClubDetailPageLayout title={name} club={club} content={content} />;
};

export default ClubDetailPage;
