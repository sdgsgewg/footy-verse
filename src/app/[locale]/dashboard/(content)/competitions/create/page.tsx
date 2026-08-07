"use client";

import CompetitionForm from "@/components/forms/competitions/CompetitionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ROUTES } from "@/constants/routes";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCompetitionSubmit } from "@/hooks/dashboard/competitions";
import { useRouter } from "@/navigation";

export default function CreateCompetitionPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useCompetitionSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "competition")}
      formSize="large"
      form={
        <CompetitionForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
