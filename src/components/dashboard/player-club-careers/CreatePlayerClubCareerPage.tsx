"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { usePlayerClubCareerSubmit } from "@/hooks/dashboard/player-club-careers/usePlayerClubCareerSubmit";
import PlayerClubCareerForm from "@/components/forms/player-club-careers/PlayerClubCareerForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { usePlayerClubCareers } from "@/hooks/dashboard/player-club-careers";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { PlayerClubCareerHistoryTable } from "@/components/players/table";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerClubCareerPage({ playerLookup }: Props) {
  const { getTitle } = useCrudPageTitle();

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { playerClubCareers } = usePlayerClubCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerClubCareerSubmit(playerLookup);

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
      title={getTitle("create", "playerClubCareer", `${player.name}`)}
      columns={1}
      tableTitle="Career History"
      table={<PlayerClubCareerHistoryTable playerClubCareers={playerClubCareers} />}
      form={
        <PlayerClubCareerForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
            })
          }
        />
      }
    />
  );
}
