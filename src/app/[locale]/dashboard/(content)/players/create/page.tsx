"use client";

import PlayerForm from "@/components/forms/players/PlayerForm";
import { usePlayerSubmit } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";

export default function CreatePlayerPage() {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

  const { submit, isSubmitting } = usePlayerSubmit();

  return (
    <FormPageLayout
      title={t("title", {
        entity: tEntities("player"),
      })}
      formSize="large"
      form={
        <PlayerForm
          mode="create"
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
