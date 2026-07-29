"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import PlayerList from "../players/PlayerList";
import { ROUTES } from "@/constants/routes";
import { useClubTeams } from "@/hooks/club-teams";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";
import { TeamType } from "@/enums/TeamType";
import { useGroupedPlayers } from "@/hooks/players";
import { useEffect } from "react";
import { SquadType } from "@/enums/SquadType";
import ClubFilter from "./filter/ClubFilter";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubDetailPage = ({ clubLookup }: Props) => {
  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  const { filters, setFilter } = usePlayerFilter();

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
  });

  const { groupedPlayers } = useGroupedPlayers({
    clubTeamId: filters.clubTeamId,
  });

  useEffect(() => {
    const seniorTeam = clubTeams.find(
      (ct) => ct.squadType === SquadType.FIRST_TEAM,
    );

    if (!seniorTeam) return;

    setFilter("clubTeamId", seniorTeam.id);
  }, [clubTeams]);

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
      <ClubFilter clubLookup={clubLookup} />

      <PlayerList
        teamType={TeamType.CLUB}
        groupedPlayers={groupedPlayers}
        baseRoute={`${ROUTES.TEAMS.CLUBS}/${slug}`}
      />
    </>
  );

  return <ClubDetailPageLayout title={name} club={club} content={content} />;
};

export default ClubDetailPage;
