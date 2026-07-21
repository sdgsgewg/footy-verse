"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { useTranslations } from "next-intl";
import { CrudPageHeader } from "@/components/templates/crud";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import { usePlayerCareerSubmit } from "@/hooks/dashboard/player-careers/usePlayerCareerSubmit";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";

interface Props {
  playerLookup: PlayerLookupResponse;
}

export default function CreatePlayerCareerPage({ playerLookup }: Props) {
  const t = useTranslations("dashboard.playerCareers.create");

  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerLookup.slug);

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
      <CrudPageHeader
        title={t("title", {
          playerName: player ? `(${player.name})` : "",
        })}
        showBackButton
      />

      <FormSectionWrapper formSize="large">
        <PlayerCareerForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
            })
          }
        />
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
}
