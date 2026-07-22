"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import {
  usePlayerNationalTeamEdit,
  usePlayerNationalTeamSubmit,
} from "@/hooks/dashboard/player-national-teams";
import { PlayerNationalTeamLookupResponse } from "@/types/player-national-teams";
import EditPlayerNationalTeamForm from "@/components/forms/player-national-teams/EditPlayerNationalTeamForm";
import { PlayerNationalTeamHistoryTable } from "@/components/shared/tables";
import CrudTableFormLayout from "@/components/templates/crud/CrudTableFormLayout";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerNationalTeamLookup: PlayerNationalTeamLookupResponse;
}

export default function EditPlayerNationalTeamPage({
  playerLookup,
  playerNationalTeamLookup,
}: Props) {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

  const { player } = usePlayerDetail(playerLookup.id);

  const { playerNationalTeam, isLoading, error, refetch } =
    usePlayerNationalTeamEdit({
      playerId: playerLookup.id,
      nationalTeamId: playerNationalTeamLookup.id,
    });

  const { submit, isSubmitting } = usePlayerNationalTeamSubmit(playerLookup);

  if (!player && isLoading) {
    return <EntityLoading entity="playerNationalTeam" />;
  }

  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!playerNationalTeam && isLoading) {
    return <EntityLoading entity="playerNationalTeam" />;
  }

  if (!playerNationalTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!playerNationalTeam) {
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
        <EditPlayerNationalTeamForm
          playerNationalTeam={playerNationalTeam}
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
