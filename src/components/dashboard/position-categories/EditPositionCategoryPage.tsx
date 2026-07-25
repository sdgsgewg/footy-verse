"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { PositionCategoryLookupResponse } from "@/types/position-category";
import {
  usePositionCategoryEdit,
  usePositionCategorySubmit,
} from "@/hooks/dashboard/position-categories";
import PositionCategoryForm from "../../forms/position-categories/PositionCategoryForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

interface Props {
  positionCategoryLookup: PositionCategoryLookupResponse;
}

const EditPositionCategoryPage = ({ positionCategoryLookup }: Props) => {
  const { getTitle } = useCrudPageTitle();

  const { positionCategory, isLoading, error, refetch } =
    usePositionCategoryEdit(positionCategoryLookup.id);

  const { submit, isSubmitting } = usePositionCategorySubmit();

  if (!positionCategory && isLoading) {
    return <EntityLoading entity="positionCategory" />;
  }

  if (!positionCategory && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!positionCategory) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "positionCategory")}
      formSize="small"
      form={
        <PositionCategoryForm
          mode="edit"
          positionCategory={positionCategory}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: positionCategory.id,
              payload,
            })
          }
        />
      }
    />
  );
};

export default EditPositionCategoryPage;
