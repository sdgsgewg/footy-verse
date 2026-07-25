"use client";

import NationalityForm from "@/components/forms/nationalities/NationalityForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useNationalitySubmit } from "@/hooks/dashboard/nationalities";
import { useTranslations } from "next-intl";

export default function CreateNationalityPage() {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

  const { submit, isSubmitting } = useNationalitySubmit();

  return (
    <FormPageLayout
      title={t("title", {
        entity: tEntities("nationality"),
        entityName: "",
      })}
      formSize="small"
      form={
        <NationalityForm
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
