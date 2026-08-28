"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import PlayerClubTeamCareerForm from "@/components/forms/player-club-team-careers/PlayerClubTeamCareerForm";
import {
  usePlayerClubTeamCareerEdit,
  usePlayerClubTeamCareers,
  usePlayerClubTeamCareerSubmit,
} from "@/hooks/dashboard/player-club-team-careers";
import { PlayerLookupResponse } from "@/types/player";
import { usePlayerDetail } from "@/hooks/dashboard/players";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerClubTeamCareerLookupResponse } from "@/types/player-club-team-career";
import PlayerClubTeamCareerHistoryTable from "@/components/players/table/PlayerClubTeamCareerHistoryTable";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerClubTeamCareerLookup: PlayerClubTeamCareerLookupResponse;
}

export default function EditPlayerClubTeamCareerPage({
  playerLookup,
  playerClubTeamCareerLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { player } = usePlayerDetail(playerLookup.id);

  const { playerClubTeamCareer, isLoading, error, refetch } =
    usePlayerClubTeamCareerEdit({
      playerId: playerLookup.id,
      playerClubTeamCareerId: playerClubTeamCareerLookup.id,
    });

  const { playerClubTeamCareers } = usePlayerClubTeamCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerClubTeamCareerSubmit(playerLookup);

  if (!player && isLoading) {
    return <EntityLoading entity="playerNationalTeamCareer" />;
  }

  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Initial request is still loading and no cached player career data is available yet.
  if (!playerClubTeamCareer && isLoading) {
    return <EntityLoading entity="playerClubTeamCareer" />;
  }

  // Initial request failed before any player career data could be loaded.
  if (!playerClubTeamCareer && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no player data is available even though loading has finished.
  if (!playerClubTeamCareer) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("edit", "playerClubTeamCareer", `${player.name}`)}
      columns={1}
      tableTitle="Career History"
      table={
        <PlayerClubTeamCareerHistoryTable
          playerLookup={playerLookup}
          playerClubTeamCareers={playerClubTeamCareers}
        />
      }
      form={
        <PlayerClubTeamCareerForm
          mode="edit"
          playerClubTeamCareer={playerClubTeamCareer}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              playerClubTeamCareerId: playerClubTeamCareer.id,
              payload,
              onSuccess: () => {
                router.push(
                  `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,
                );
              },
            })
          }
        />
      }
      backHref={`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`}
    />
  );
}
