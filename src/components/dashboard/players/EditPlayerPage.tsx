"use client";

import { usePlayerEdit, usePlayerSubmit } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { useTranslations } from "next-intl";
import { CrudPageHeader } from "@/components/templates/crud";
import PlayerForm from "@/components/forms/players/PlayerForm";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function EditPlayerPage({ playerLookup }: Props) {
  const tEdit = useTranslations("dashboard.players.edit");

  const { player, isLoading, error, refetch } = usePlayerEdit(playerLookup.id);

  const { submit, isSubmitting } = usePlayerSubmit();

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
    <DashboardPageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionWrapper formSize="large">
        <PlayerForm
          mode="edit"
          player={player}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: player.id,
              payload,
            })
          }
        />
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
}
