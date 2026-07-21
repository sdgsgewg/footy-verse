"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import PlayerList from "../players/PlayerList";
import { usePlayers } from "@/hooks/dashboard/players";
import { ROUTES } from "@/constants/routes";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubDetailPage = ({ clubLookup }: Props) => {
  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  const { players } = usePlayers(
    clubLookup ? { clubId: clubLookup.id } : undefined,
  );

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

  const { name, slug } = club;

  // Player List in grid style
  const content = (
    <>
      <PlayerList
        teamType="club"
        players={players}
        baseRoute={`${ROUTES.TEAMS.CLUBS}/${slug}`}
      />
    </>
  );

  return <ClubDetailPageLayout title={name} club={club} content={content} />;
};

export default ClubDetailPage;
