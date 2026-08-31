"use client";

import PositionForm from "@/components/forms/positions/PositionForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ROUTES } from "@/constants/routes";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
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
                router.push(ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
