"use client";

import ClubForm from "@/components/forms/clubs/ClubForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { useClubSubmit } from "@/hooks/manage/clubs";
import { useTranslations } from "next-intl";

export default function CreateClubPage() {
  const t = useTranslations("manage.clubs.create");

  const { submit, isSubmitting } = useClubSubmit();

  return (
    <ManagePageWrapper>
      <CrudPageHeader title={t("title")} showBackButton />

      <FormSectionLayout formSize="small">
        <ClubForm
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
