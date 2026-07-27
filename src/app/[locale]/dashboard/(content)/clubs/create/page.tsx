"use client";

import ClubForm from "@/components/forms/clubs/ClubForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useClubSubmit } from "@/hooks/dashboard/clubs";

export default function CreateClubPage() {
  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useClubSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "club")}
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
