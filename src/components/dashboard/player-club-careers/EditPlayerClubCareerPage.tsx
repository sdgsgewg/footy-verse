"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import PlayerClubCareerForm from "@/components/forms/player-club-careers/PlayerClubCareerForm";
import {
  usePlayerClubCareerEdit,
  usePlayerClubCareers,
  usePlayerClubCareerSubmit,
} from "@/hooks/dashboard/player-club-careers";
import { PlayerLookupResponse } from "@/types/player";
import { usePlayerDetail } from "@/hooks/dashboard/players";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerClubCareerLookupResponse } from "@/types/player-club-career";
import PlayerClubCareerHistoryTable from "@/components/players/table/PlayerClubCareerHistoryTable";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerClubCareerLookup: PlayerClubCareerLookupResponse;
}

export default function EditPlayerClubCareerPage({
  playerLookup,
  playerClubCareerLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { player } = usePlayerDetail(playerLookup.id);

  const { playerClubCareer, isLoading, error, refetch } =
    usePlayerClubCareerEdit({
      playerId: playerLookup.id,
      careerId: playerClubCareerLookup.id,
    });

  const { playerClubCareers } = usePlayerClubCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerClubCareerSubmit(playerLookup);

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
  if (!playerClubCareer && isLoading) {
    return <EntityLoading entity="playerClubCareer" />;
  }

  // Initial request failed before any player career data could be loaded.
  if (!playerClubCareer && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no player data is available even though loading has finished.
  if (!playerClubCareer) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const handleNavigateBack = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`);
  };

  return (
    <TableFormLayout
      title={getTitle("edit", "playerClubCareer", `${player.name}`)}
      columns={1}
      tableTitle="Career History"
      table={
        <PlayerClubCareerHistoryTable
          playerLookup={playerLookup}
          playerClubCareers={playerClubCareers}
        />
      }
      form={
        <PlayerClubCareerForm
          mode="edit"
          playerClubCareer={playerClubCareer}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              playerClubCareerId: playerClubCareer.id,
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
      onBack={handleNavigateBack}
    />
  );
}
