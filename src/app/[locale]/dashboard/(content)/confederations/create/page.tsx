"use client";

import ConfederationForm from "@/components/forms/confederations/ConfederationForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ROUTES } from "@/constants/routes";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useConfederationSubmit } from "@/hooks/dashboard/confederations";
import { useRouter } from "@/navigation";

export default function CreateConfederationPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useConfederationSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "confederation")}
      formSize="large"
      form={
        <ConfederationForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
