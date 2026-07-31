"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { ClubLookupResponse } from "@/types/club";
import { ClubTeamLookupResponse } from "@/types/club-team";
import { useClubTeamDetail } from "@/hooks/dashboard/club-teams";
import ClubTeamDetailPageLayout from "@/components/layout/detail-page/ClubTeamDetailPageLayout";

interface Props {
  clubLookup: ClubLookupResponse;
  clubTeamLookup: ClubTeamLookupResponse;
  returnTo: string;
}

const ClubTeamDetailPage = ({
  clubLookup,
  clubTeamLookup,
  returnTo,
}: Props) => {
  const { clubTeam, isLoading, error, refetch } = useClubTeamDetail({
    clubId: clubLookup.id,
    teamId: clubTeamLookup.id,
  });

  if (!clubTeam && isLoading) {
    return <EntityLoading entity="clubTeam" />;
  }

  if (!clubTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!clubTeam) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return <ClubTeamDetailPageLayout clubTeam={clubTeam} returnTo={returnTo} />;
};

export default ClubTeamDetailPage;
