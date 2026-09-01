"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { usePlayerClubTeamCareerSubmit } from "@/hooks/dashboard/player-club-team-careers";
import PlayerClubTeamCareerForm from "@/components/forms/player-club-team-careers/PlayerClubTeamCareerForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { usePlayerClubTeamCareers } from "@/hooks/dashboard/player-club-team-careers";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { PlayerClubTeamCareerHistoryTable } from "@/components/players/table";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerClubTeamCareerPage({
  playerLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { playerClubTeamCareers } = usePlayerClubTeamCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerClubTeamCareerSubmit(playerLookup);

  // Initial request is still loading and no cached player data is available yet.
  if (!player && isLoading) {
    return <EntityLoading entity="player" />;
  }

  // Initial request failed before any player data could be loaded.
  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no player data is available even though loading has finished.
  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle(
        "create",
        "playerClubTeamCareer",
        `${player.summary.shortName}`,
      )}
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
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
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
