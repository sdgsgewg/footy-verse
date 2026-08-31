"use client";

import RegionForm from "@/components/forms/regions/RegionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ENTITY_CONFIG } from "@/config/entities";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRegionSubmit } from "@/hooks/dashboard/regions";
import { useRouter } from "@/navigation";

export default function CreateRegionPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useRegionSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "region")}
      formSize="large"
      form={
        <RegionForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ENTITY_CONFIG["region"]["dashboardRoute"]);
              },
            })
          }
        />
      }
    />
  );
}
