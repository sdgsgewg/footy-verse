"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import {
  usePlayerNationalTeamCareerEdit,
  usePlayerNationalTeamCareers,
  usePlayerNationalTeamCareerSubmit,
} from "@/hooks/dashboard/player-national-teams";
import EditPlayerNationalTeamForm from "@/components/forms/player-national-team-careers/edit/EditPlayerNationalTeamCareerForm";
import { PlayerNationalTeamHistoryTable } from "@/components/shared/tables";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerNationalTeamCareerLookupResponse } from "@/types/player-national-team-career";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerNationalTeamLookup: PlayerNationalTeamCareerLookupResponse;
}

export default function EditPlayerNationalTeamPage({
  playerLookup,
  playerNationalTeamLookup,
}: Props) {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

  const { player } = usePlayerDetail(playerLookup.id);

  const {
    playerNationalTeamCareer: playerNationalTeam,
    isLoading,
    error,
    refetch,
  } = usePlayerNationalTeamCareerEdit({
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

  if (!playerNationalTeam && isLoading) {
    return <EntityLoading entity="playerNationalTeamCareer" />;
  }

  if (!playerNationalTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!playerNationalTeam) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={t("title", {
        entity: tEntities("playerNationalTeam"),
        entityName: player ? `(${player.name})` : "",
      })}
      columns={2}
      tableTitle="National Team History"
      table={
        <PlayerNationalTeamHistoryTable
          playerNationalTeamCareers={playerNationalTeams}
        />
      }
      form={
        <EditPlayerNationalTeamForm
          playerNationalTeamCareer={playerNationalTeam}
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
