"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { NationalTeamLookupResponse } from "@/types/national-team";
import { useNationalTeamDetail } from "@/hooks/dashboard/national-teams";
import { NationalityLookupResponse } from "@/types/nationality";
import NationalTeamDetailPageLayout from "@/components/layout/detail-page/NationalTeamDetailPageLayout";

interface Props {
  nationalityLookup: NationalityLookupResponse;
  nationalTeamLookup: NationalTeamLookupResponse;
  returnTo: string;
}

const NationalTeamDetailPage = ({
  nationalityLookup,
  nationalTeamLookup,
  returnTo,
}: Props) => {
  const { nationalTeam, isLoading, error, refetch } = useNationalTeamDetail({
    nationId: nationalityLookup.id,
    teamId: nationalTeamLookup.id,
  });

  if (!nationalTeam && isLoading) {
    return <EntityLoading entity="nationalTeam" />;
  }

  if (!nationalTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationalTeam) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <NationalTeamDetailPageLayout
      nationalTeam={nationalTeam}
      returnTo={returnTo}
    />
  );
};

export default NationalTeamDetailPage;
