"use client";

import PositionForm from "@/components/forms/positions/PositionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ENTITY_CONFIG } from "@/config/entities";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { usePositionSubmit } from "@/hooks/dashboard/positions";
import { useRouter } from "@/navigation";

export default function CreatePositionPage() {
  const router = useRouter();

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
              onSuccess: () => {
                router.push(ENTITY_CONFIG["position"]["dashboardRoute"]);
              },
            })
          }
        />
      }
    />
  );
}
