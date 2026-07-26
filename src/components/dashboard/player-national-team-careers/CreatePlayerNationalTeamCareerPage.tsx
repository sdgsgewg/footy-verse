"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import {
  usePlayerNationalTeamCareers,
  usePlayerNationalTeamCareerSubmit,
} from "@/hooks/dashboard/player-national-teams";
import CreatePlayerNationalTeamCareerForm from "@/components/forms/player-national-team-careers/CreatePlayerNationalTeamCareerForm";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { PlayerNationalTeamHistoryTable } from "@/components/shared/tables";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerNationalTeamCareerPage({
  playerLookup,
}: Props) {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

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

  return (
    <TableFormLayout
      title={t("title", {
        entity: tEntities("playerNationalTeamCareer"),
        entityName: player ? `(${player.name})` : "",
      })}
      columns={2}
      tableTitle="National Team History"
      table={
        <PlayerNationalTeamHistoryTable
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
    />
  );
}
