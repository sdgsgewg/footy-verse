"use client";

import PositionForm from "@/components/forms/positions/PositionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { usePositionSubmit } from "@/hooks/dashboard/positions";

export default function CreatePositionPage() {
  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = usePositionSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "position")}
      formSize="small"
      form={
        <PositionForm
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
