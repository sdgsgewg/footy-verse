"use client";

import ClubForm from "@/components/forms/clubs/ClubForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ROUTES } from "@/constants/routes";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useClubSubmit } from "@/hooks/dashboard/clubs";
import { useRouter } from "@/navigation";

export default function CreateClubPage() {
  const router = useRouter();

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
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.CLUBS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
