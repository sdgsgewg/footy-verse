"use client";

import PlayerCareerForm from "@/components/forms/player-careers/PlayerCareerForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayerCareerSubmit } from "@/hooks/dashboard/player-careers/usePlayerCareerSubmit";
import { usePlayer } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function CreatePlayerCareerPage() {
  const { playerId } = useParams() as {
    playerId: string;
  };

  const t = useTranslations("dashboard.playerCareers.create");

  const { player } = usePlayer({ id: playerId });

  const { submit, isSubmitting } = usePlayerCareerSubmit(playerId);

  return (
    <ManagePageWrapper>
      <CrudPageHeader
        title={t("title", {
          playerName: player ? `(${player.name})` : "",
        })}
        showBackButton
      />

      <FormSectionLayout formSize="large">
        <PlayerCareerForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
            })
          }
        />
      </FormSectionLayout>
    </ManagePageWrapper>
  );
}
