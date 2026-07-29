"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import PlayerList from "../players/PlayerList";
import { ROUTES } from "@/constants/routes";
import { TeamType } from "@/enums/TeamType";
import { useGroupedPlayers } from "@/hooks/players";
import { useEffect } from "react";
import { NationalityLookupResponse } from "@/types/nationality";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";
import { AgeGroup } from "@/enums/AgeGroup";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import NationalityDetailPageLayout from "../layout/detail-page/NationalityDetailPageLayout";
import NationalityFilter from "./filter/NationalityFilter";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const NationalityDetailPage = ({ nationalityLookup }: Props) => {
  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationalityLookup.id,
  );

  const { filters, setFilter } = useGroupedPlayerFilter();

  const { nationalTeams } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  const { groupedPlayers } = useGroupedPlayers({
    nationalTeamId: filters.nationalTeamId,
  });

  // Set senior team as default

  useEffect(() => {
    const seniorTeam = nationalTeams.find(
      (nt) => nt.ageGroup === AgeGroup.SENIOR,
    );

    if (!seniorTeam) return;

    setFilter("nationalTeamId", seniorTeam.id);
  }, [nationalTeams]);

  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { name, slug } = nationality;

  // Player List in grid style
  const content = (
    <>
      <NationalityFilter nationalityLookup={nationalityLookup} />

      <PlayerList
        teamType={TeamType.NATIONAL_TEAM}
        groupedPlayers={groupedPlayers}
        baseRoute={`${ROUTES.TEAMS.NATIONALITIES}/${slug}`}
      />
    </>
  );

  return (
    <NationalityDetailPageLayout
      title={name}
      nationality={nationality}
      content={content}
    />
  );
};

export default NationalityDetailPage;
