"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import {
  usePlayerNationalTeamCareers,
  usePlayerNationalTeamCareerSubmit,
} from "@/hooks/dashboard/player-national-teams";
import CreatePlayerNationalTeamCareerForm from "@/components/forms/player-national-team-careers/CreatePlayerNationalTeamCareerForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { PlayerNationalTeamCareerHistoryTable } from "@/components/players/table";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerNationalTeamCareerPage({
  playerLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { playerNationalTeamCareers } = usePlayerNationalTeamCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } =
    usePlayerNationalTeamCareerSubmit(playerLookup);

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

  const handleNavigateBack = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`);
  };

  return (
    <TableFormLayout
      title={getTitle("create", "playerNationalTeamCareer", `${player.name}`)}
      columns={1}
      tableTitle="National Team History"
      table={
        <PlayerNationalTeamCareerHistoryTable
          playerLookup={playerLookup}
          playerNationalTeamCareers={playerNationalTeamCareers}
        />
      }
      form={
        <CreatePlayerNationalTeamCareerForm
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
            })
          }
        />
      }
      onBack={handleNavigateBack}
    />
  );
}
