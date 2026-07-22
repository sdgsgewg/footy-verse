"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import { usePlayerNationalTeamSubmit } from "@/hooks/dashboard/player-national-teams";
import CreatePlayerNationalTeamForm from "@/components/forms/player-national-teams/CreatePlayerNationalTeamForm";
import CrudTableFormLayout from "@/components/templates/crud/CrudTableFormLayout";
import { PlayerNationalTeamHistoryTable } from "@/components/shared/tables";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerNationalTeamPage({ playerLookup }: Props) {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { submit, isSubmitting } = usePlayerNationalTeamSubmit(playerLookup);

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
    <CrudTableFormLayout
      title={t("title", {
        entity: tEntities("playerNationalTeam"),
        playerName: player ? `(${player.name})` : "",
      })}
      columns={2}
      tableTitle="National Team History"
      table={
        <PlayerNationalTeamHistoryTable
          playerNationalTeams={player.history.nationalTeams}
        />
      }
      form={
        <CreatePlayerNationalTeamForm
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
