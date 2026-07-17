"use client";

import Loading from "@/components/feedback/Loading";
import NotFound from "@/components/feedback/NotFound";
import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayerCareer } from "@/hooks/dashboard/player-careers/usePlayerCareer";
import { usePlayerCareerSubmit } from "@/hooks/dashboard/player-careers/usePlayerCareerSubmit";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditPlayerCareerPage = () => {
  const t = useTranslations("dashboard.playerCareers");
  const tEdit = useTranslations("dashboard.playerCareers.edit");

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
    return <Loading />;
  }

  if (!playerCareer) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <ManagePageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionLayout formSize="large">
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
      </FormSectionLayout>
    </ManagePageWrapper>
  );
};

export default EditPlayerCareerPage;
