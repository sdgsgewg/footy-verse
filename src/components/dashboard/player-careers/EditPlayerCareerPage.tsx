"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import {
  usePlayerCareerEdit,
  usePlayerCareers,
  usePlayerCareerSubmit,
} from "@/hooks/dashboard/player-careers";
import { PlayerLookupResponse } from "@/types/player";
import { PlayerCareerLookupResponse } from "@/types/player-career";
import { useTranslations } from "next-intl";
import { usePlayerDetail } from "@/hooks/dashboard/players";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerCareerHistoryTable } from "@/components/shared/tables";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerCareerLookup: PlayerCareerLookupResponse;
}

export default function EditPlayerCareerPage({
  playerLookup,
  playerCareerLookup,
}: Props) {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

  const { player } = usePlayerDetail(playerLookup.id);

  const { playerCareer, isLoading, error, refetch } = usePlayerCareerEdit({
    playerId: playerLookup.id,
    careerId: playerCareerLookup.id,
  });

  const { playerCareers } = usePlayerCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerLookup);

  if (!player && isLoading) {
    return <EntityLoading entity="playerNationalTeam" />;
  }

  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Initial request is still loading and no cached player career data is available yet.
  if (!playerCareer && isLoading) {
    return <EntityLoading entity="playerCareer" />;
  }

  // Initial request failed before any player career data could be loaded.
  if (!playerCareer && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no player data is available even though loading has finished.
  if (!playerCareer) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={t("title", {
        entity: tEntities("playerCareer"),
        entityName: player ? `(${player.name})` : "",
      })}
      columns={1}
      tableTitle="Career History"
      table={<PlayerCareerHistoryTable playerCareers={playerCareers} />}
      form={
        <PlayerCareerForm
          mode="edit"
          playerCareer={playerCareer}
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
