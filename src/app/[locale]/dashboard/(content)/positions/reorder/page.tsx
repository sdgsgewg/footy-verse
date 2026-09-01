"use client";

import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useRouter } from "@/navigation";
import ReorderPositionsForm from "@/components/forms/positions/ReorderPositionsForm";
import { useReorderPositionsSubmit } from "@/hooks/dashboard/positions";
import { ENTITY_CONFIG } from "@/config/entities";

export default function ReorderPositionsPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useReorderPositionsSubmit();

  return (
    <FormPageLayout
      title={getTitle("reorder", "position")}
      formSize="large"
      form={
        <ReorderPositionsForm
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
