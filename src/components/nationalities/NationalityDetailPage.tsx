"use client";

import { useEffect } from "react";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";

import PlayerList from "../players/PlayerList";
import NationalityDetailPageLayout from "../layout/detail-page/NationalityDetailPageLayout";
import NationalityFilter from "./filter/NationalityFilter";

import { ROUTES } from "@/constants/routes";
import { TeamType } from "@/enums/TeamType";
import { AgeGroup } from "@/enums/AgeGroup";

import { useGroupedPlayers } from "@/hooks/players";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";

import type { NationalityLookupResponse } from "@/types/nationality";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const NationalityDetailPage = ({ nationalityLookup }: Props) => {
  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationalityLookup.id,
  );

  // Dipanggil hanya sekali
  const { filters, setFilter } = useGroupedPlayerFilter();

  const { nationalTeams } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  const { groupedPlayers } = useGroupedPlayers({
    nationalTeamId: filters.nationalTeamId,
  });

  // Set senior team sebagai default
  useEffect(() => {
    const seniorTeam = nationalTeams.find(
      (team) => team.ageGroup === AgeGroup.SENIOR,
    );

    if (!seniorTeam) return;

    // Jangan overwrite pilihan user
    if (filters.nationalTeamId) return;

    setFilter("nationalTeamId", seniorTeam.id);
  }, [nationalTeams, filters.nationalTeamId, setFilter]);

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

  const content = (
    <>
      <NationalityFilter
        nationalTeams={nationalTeams}
        filters={filters}
        setFilter={setFilter}
      />

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
