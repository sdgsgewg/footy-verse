"use client";

import PlayerForm from "@/components/forms/players/PlayerForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayerSubmit } from "@/hooks/manage/players";
import { useTranslations } from "next-intl";

export default function CreatePlayerPage() {
  const t = useTranslations("manage.players.create");

  const { submit, isSubmitting } = usePlayerSubmit();

  return (
    <ManagePageWrapper>
      <CrudPageHeader title={t("title")} showBackButton />

      <FormSectionLayout formSize="large">
        <PlayerForm
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
