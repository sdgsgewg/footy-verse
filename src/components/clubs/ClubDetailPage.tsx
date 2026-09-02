"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import { useClubTeams } from "@/hooks/club-teams";
import { TeamType } from "@/enums/TeamType";
import { useGroupedPlayers } from "@/hooks/players";
import { useEffect } from "react";
import { SquadType } from "@/enums/SquadType";
import ClubFilterSection from "./filter/ClubFilterSection";
import { useClubTeamDetail } from "@/hooks/dashboard/club-teams";
import ClubTeamSummary from "../dashboard/club-teams/summary/ClubTeamSummary";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import ClubTeamSummarySkeleton from "../dashboard/club-teams/summary/ClubTeamSummarySkeleton";
import PlayerListSection from "../players/PlayerListSection";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubDetailPage = ({ clubLookup }: Props) => {
  const {
    club,
    isLoading: isClubLoading,
    error: clubError,
    refetch: refetchClub,
  } = useClubDetail(clubLookup.id);

  const { filters, updateFilter } = useGroupedPlayerFilter();

  const { clubTeams, loading: isClubTeamsLoading } = useClubTeams({
    clubId: clubLookup.id,
  });

  const seniorTeam = clubTeams.find(
    (team) => team.squadType === SquadType.FIRST_TEAM,
  );

  const selectedClubTeamId =
    filters.clubTeamId ?? seniorTeam?.id ?? clubTeams[0]?.id;

  const { clubTeam, isLoading: isClubTeamLoading } = useClubTeamDetail({
    clubId: clubLookup.id,
    teamId: selectedClubTeamId,
  });

  const {
    groupedPlayers,
    isLoading: isPlayersLoading,
    error: playersError,
    refetch: refetchPlayers,
  } = useGroupedPlayers({
    clubTeamId: selectedClubTeamId,
  });

  useEffect(() => {
    if (filters.clubTeamId) return;

    if (!seniorTeam) return;

    updateFilter("clubTeamId", seniorTeam.id);
  }, [filters.clubTeamId, seniorTeam, updateFilter]);

  // Initial request is still loading and no cached club data is available yet.
  if (!club && isClubLoading) {
    return <EntityLoading entity="club" />;
  }

  // Initial request failed before any club data could be loaded.
  if (!club && clubError) {
    return <ErrorState onRetry={() => void refetchClub()} />;
  }

  // Fallback: no club data is available even though loading has finished.
  if (!club) {
    return <ErrorState onRetry={() => void refetchClub()} />;
  }

  const { name } = club;

  const isTeamLoading = isClubTeamsLoading || isClubTeamLoading;

  const summary = isTeamLoading ? (
    <ClubTeamSummarySkeleton />
  ) : clubTeam ? (
    <ClubTeamSummary summary={clubTeam} />
  ) : null;

  // Player List in grid style
  const content = (
    <>
      <ClubFilterSection
        clubTeams={clubTeams}
        filters={filters}
        updateFilter={updateFilter}
      />

      <PlayerListSection
        teamType={TeamType.CLUB}
        groupedPlayers={groupedPlayers}
        isLoading={isPlayersLoading}
        error={playersError}
        onRetry={() => void refetchPlayers()}
      />
    </>
  );

  return (
    <ClubDetailPageLayout title={name} summary={summary} content={content} />
  );
};

export default ClubDetailPage;
