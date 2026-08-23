"use client";

import { useEffect } from "react";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";

import NationalityDetailPageLayout from "../layout/detail-page/NationalityDetailPageLayout";
import NationalityFilter from "./filter/NationalityFilter";
import NationalTeamSummary from "../dashboard/national-teams/summary/NationalTeamSummary";

import { ROUTES } from "@/constants/routes";
import { TeamType } from "@/enums/TeamType";
import { AgeGroup } from "@/enums/AgeGroup";

import { useGroupedPlayers } from "@/hooks/players";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";
import { useNationalTeamDetail } from "@/hooks/dashboard/national-teams";

import type { NationalityLookupResponse } from "@/types/nationality";
import NationalTeamSummarySkeleton from "../dashboard/national-teams/summary/NationalTeamSummarySkeleton";
import PlayerListSection from "../players/PlayerListSection";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const NationalityDetailPage = ({ nationalityLookup }: Props) => {
  const {
    nationality,
    isLoading: isNationalityLoading,
    error: nationalityError,
    refetch: refetchNationality,
  } = useNationalityDetail(nationalityLookup.id);

  const { filters, updateFilter } = useGroupedPlayerFilter();

  const { nationalTeams, loading: isNationalTeamsLoading } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  const seniorTeam = nationalTeams.find(
    (team) => team.ageGroup === AgeGroup.SENIOR,
  );

  const selectedNationalTeamId =
    filters.nationalTeamId ?? seniorTeam?.id ?? nationalTeams[0]?.id;

  const { nationalTeam, isLoading: isNationalTeamLoading } =
    useNationalTeamDetail({
      nationId: nationalityLookup.id,
      teamId: selectedNationalTeamId,
    });

  const {
    groupedPlayers,
    isLoading: isPlayersLoading,
    error: playersError,
    refetch: refetchPlayers,
  } = useGroupedPlayers({
    nationalTeamId: selectedNationalTeamId,
  });

  useEffect(() => {
    if (filters.nationalTeamId) return;

    if (!seniorTeam) return;

    updateFilter("nationalTeamId", seniorTeam.id);
  }, [filters.nationalTeamId, seniorTeam, updateFilter]);

  if (!nationality && isNationalityLoading) {
    return <EntityLoading entity="nationality" />;
  }

  if (!nationality && nationalityError) {
    return <ErrorState onRetry={() => void refetchNationality()} />;
  }

  if (!nationality) {
    return <ErrorState onRetry={() => void refetchNationality()} />;
  }

  const { name, slug } = nationality;

  const isTeamLoading = isNationalTeamsLoading || isNationalTeamLoading;

  const summary = isTeamLoading ? (
    <NationalTeamSummarySkeleton />
  ) : nationalTeam ? (
    <NationalTeamSummary summary={nationalTeam} />
  ) : null;

  const content = (
    <>
      <NationalityFilter
        nationalTeams={nationalTeams}
        filters={filters}
        updateFilter={updateFilter}
      />

      <PlayerListSection
        teamType={TeamType.NATIONAL_TEAM}
        groupedPlayers={groupedPlayers}
        isLoading={isPlayersLoading}
        error={playersError}
        onRetry={() => void refetchPlayers()}
        baseRoute={`${ROUTES.TEAMS.NATIONALITIES}/${slug}`}
      />
    </>
  );

  return (
    <NationalityDetailPageLayout
      title={name}
      summary={summary}
      content={content}
    />
  );
};

export default NationalityDetailPage;
