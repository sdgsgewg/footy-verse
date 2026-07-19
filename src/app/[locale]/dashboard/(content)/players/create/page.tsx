"use client";

import PlayerForm from "@/components/forms/players/PlayerForm";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayerSubmit } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";

export default function CreatePlayerPage() {
  const t = useTranslations("dashboard.players.create");

  const { submit, isSubmitting } = usePlayerSubmit();

  return (
    <DashboardPageWrapper>
      <CrudPageHeader title={t("title")} showBackButton />

      <FormSectionWrapper formSize="large">
        <PlayerForm
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
