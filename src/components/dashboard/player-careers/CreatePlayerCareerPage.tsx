"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { usePlayerCareerSubmit } from "@/hooks/dashboard/player-careers/usePlayerCareerSubmit";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import { PlayerCareerHistoryTable } from "@/components/shared/tables";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { useTranslations } from "next-intl";
import { usePlayerCareers } from "@/hooks/dashboard/player-careers";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerCareerPage({ playerLookup }: Props) {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { playerCareers } = usePlayerCareers({
    playerId: player?.id,
  });

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerLookup);

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
      title={t("title", {
        entity: tEntities("playerCareer"),
        entityName: player ? `(${player.name})` : "",
      })}
      columns={1}
      tableTitle="Career History"
      table={<PlayerCareerHistoryTable playerCareers={playerCareers} />}
      form={
        <PlayerCareerForm
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
