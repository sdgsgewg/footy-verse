"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import {
  usePlayerNationalTeamCareerEdit,
  usePlayerNationalTeamCareers,
  usePlayerNationalTeamCareerSubmit,
} from "@/hooks/dashboard/player-national-teams";
import EditPlayerNationalTeamCareerForm from "@/components/forms/player-national-team-careers/edit/EditPlayerNationalTeamCareerForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerNationalTeamCareerLookupResponse } from "@/types/player-national-team-career";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { PlayerNationalTeamCareerHistoryTable } from "@/components/players/table";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerNationalTeamLookup: PlayerNationalTeamCareerLookupResponse;
}

export default function EditPlayerNationalTeamCareerPage({
  playerLookup,
  playerNationalTeamLookup,
}: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { player } = usePlayerDetail(playerLookup.id);

  const { playerNationalTeamCareer, isLoading, error, refetch } =
    usePlayerNationalTeamCareerEdit({
      playerId: playerLookup.id,
      nationalTeamId: playerNationalTeamLookup.id,
    });

  const { playerNationalTeamCareers: playerNationalTeams } =
    usePlayerNationalTeamCareers({
      playerId: player?.id,
    });

  const { submit, isSubmitting } =
    usePlayerNationalTeamCareerSubmit(playerLookup);

  if (!player && isLoading) {
    return <EntityLoading entity="playerNationalTeamCareer" />;
  }

  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!playerNationalTeamCareer && isLoading) {
    return <EntityLoading entity="playerNationalTeamCareer" />;
  }

  if (!playerNationalTeamCareer && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!playerNationalTeamCareer) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const handleNavigateBack = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`);
  };

  return (
    <TableFormLayout
      title={getTitle("edit", "playerNationalTeamCareer", `${player.name}`)}
      columns={1}
      tableTitle="National Team History"
      table={
        <PlayerNationalTeamCareerHistoryTable
          playerLookup={playerLookup}
          playerNationalTeamCareers={playerNationalTeams}
        />
      }
      form={
        <EditPlayerNationalTeamCareerForm
          playerNationalTeamCareer={playerNationalTeamCareer}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              playerNationalTeamCareerId: playerNationalTeamCareer.id,
              payload,
            })
          }
        />
      }
      onBack={handleNavigateBack}
    />
  );
}
