"use client";

import PositionCategoryForm from "@/components/forms/position-categories/PositionCategoryForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { usePositionCategorySubmit } from "@/hooks/dashboard/position-categories";

export default function CreatePositionCategoryPage() {
  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = usePositionCategorySubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "positionCategory")}
      formSize="small"
      form={
        <PositionCategoryForm
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
