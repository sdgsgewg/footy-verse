"use client";

import ClubForm from "@/components/forms/clubs/ClubForm";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { useClubSubmit } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";

export default function CreateClubPage() {
  const t = useTranslations("dashboard.clubs.create");

  const { submit, isSubmitting } = useClubSubmit();

  return (
    <DashboardPageWrapper>
      <CrudPageHeader title={t("title")} showBackButton />

      <FormSectionWrapper formSize="small">
        <ClubForm
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
