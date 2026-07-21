import EntityLoading from "@/components/feedback/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import { CrudPageHeader } from "@/components/templates/crud";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import {
  usePlayerCareerEdit,
  usePlayerCareerSubmit,
} from "@/hooks/dashboard/player-careers";
import { PlayerLookupResponse } from "@/types/player";
import { PlayerCareerLookupResponse } from "@/types/player-career";
import { useTranslations } from "next-intl";

interface Props {
  playerLookup: PlayerLookupResponse;
  playerCareerLookup: PlayerCareerLookupResponse;
}

export default function EditPlayerCareerPage({
  playerLookup,
  playerCareerLookup,
}: Props) {
  const tEdit = useTranslations("dashboard.playerCareers.edit");

  const { playerCareer, isLoading, error, refetch } = usePlayerCareerEdit({
    playerId: playerLookup.id,
    careerId: playerCareerLookup.id,
  });

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerCareerLookup.id);

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
    <DashboardPageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionWrapper formSize="large">
        <PlayerCareerForm
          mode="edit"
          playerCareer={playerCareer}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              careerId: playerCareer.id,
              payload,
            })
          }
        />
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
}
