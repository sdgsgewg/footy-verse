"use client";

import ConfederationForm from "@/components/forms/confederations/ConfederationForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useConfederationSubmit } from "@/hooks/dashboard/confederations";

export default function CreateConfederationPage() {
  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useConfederationSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "confederation")}
      formSize="small"
      form={
        <ConfederationForm
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
