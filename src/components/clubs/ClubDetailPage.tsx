"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import PlayerList from "../players/PlayerList";
import { usePlayers } from "@/hooks/dashboard/players";
import { ROUTES } from "@/constants/routes";
import { useClubTeams } from "@/hooks/club-teams";
import { SelectField } from "../forms/fields";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubDetailPage = ({ clubLookup }: Props) => {
  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  const { filters, setFilters } = usePlayerFilter();

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
  });

  const { players } = usePlayers({ clubTeamId: filters.clubTeamId });

  const clubTeamOptions = getClubTeamOptions(clubTeams);

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
      {/* Test Dropdown Club Teams */}
      <SelectField
        label={`Club Teams`}
        name="club_teams"
        placeholder={`Select Club Team`}
        options={clubTeamOptions}
        value={filters.clubTeamId || ""}
        onChange={(value) => setFilters({ ...filters, clubTeamId: value })}
        required
      />

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
