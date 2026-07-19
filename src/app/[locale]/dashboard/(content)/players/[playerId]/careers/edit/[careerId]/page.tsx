"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayerCareer } from "@/hooks/dashboard/player-careers/usePlayerCareer";
import { usePlayerCareerSubmit } from "@/hooks/dashboard/player-careers/usePlayerCareerSubmit";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditPlayerCareerPage = () => {
  const t = useTranslations("dashboard.playerCareers");
  const tEdit = useTranslations("dashboard.playerCareers.edit");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { playerId, careerId } = useParams() as {
    playerId: string;
    careerId: string;
  };

  const { playerCareer, loading } = usePlayerCareer({
    playerId,
    careerId,
  });

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerId);

  if (loading) {
    return (
      <PageLoading
        message={tCommonStates("loadingEntity", {
          entity: tEntities("player").toLowerCase(),
        })}
      />
    );
  }

  if (!playerCareer) {
    return <NotFound text={t("notFound")} />;
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
              careerId,
              payload,
            })
          }
        />
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
};

export default EditPlayerCareerPage;
