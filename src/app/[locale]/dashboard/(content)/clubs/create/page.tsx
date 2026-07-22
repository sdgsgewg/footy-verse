"use client";

import ClubForm from "@/components/forms/clubs/ClubForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useClubSubmit } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";

export default function CreateClubPage() {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

  const { submit, isSubmitting } = useClubSubmit();

  return (
    <FormPageLayout
      title={t("title", {
        entity: tEntities("club"),
      })}
      formSize="small"
      form={
        <ClubForm
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
