"use client";

import NationalityForm from "@/components/forms/nationalities/NationalityForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ROUTES } from "@/constants/routes";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useNationalitySubmit } from "@/hooks/dashboard/nationalities";
import { useRouter } from "@/navigation";

export default function CreateNationalityPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useNationalitySubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "nationality")}
      formSize="small"
      form={
        <NationalityForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE);
              },
            })
          }
        />
      }
    />
  );
}
