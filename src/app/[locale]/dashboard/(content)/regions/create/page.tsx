"use client";

import RegionForm from "@/components/forms/regions/RegionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRegionSubmit } from "@/hooks/dashboard/regions";

export default function CreateRegionPage() {
  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useRegionSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "region")}
      formSize="small"
      form={
        <RegionForm
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
