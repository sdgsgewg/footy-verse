"use client";

import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";
import { useReorderPositionCategoriesSubmit } from "@/hooks/dashboard/position-categories";
import ReorderPositionCategoriesForm from "@/components/forms/position-categories/ReorderPositionCategoriesForm";

export default function ReorderPositionCategoriesPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useReorderPositionCategoriesSubmit();

  return (
    <FormPageLayout
      title={getTitle("reorder", "positionCategory")}
      formSize="large"
      form={
        <ReorderPositionCategoriesForm
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE);
              },
            })
          }
        />
      }
    />
  );
}
