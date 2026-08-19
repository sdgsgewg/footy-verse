"use client";

import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";
import ReorderPositionsForm from "@/components/forms/positions/ReorderPositionsForm";
import { useReorderPositionsSubmit } from "@/hooks/dashboard/positions";

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
                router.push(ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
