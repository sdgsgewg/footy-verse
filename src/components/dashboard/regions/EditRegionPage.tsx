"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { RegionLookupResponse } from "@/types/region";
import { useRegionEdit, useRegionSubmit } from "@/hooks/dashboard/regions";
import RegionForm from "@/components/forms/regions/RegionForm";

interface Props {
  regionLookup: RegionLookupResponse;
}

const EditRegionPage = ({ regionLookup }: Props) => {
  const { getTitle } = useCrudPageTitle();

  const { region, isLoading, error, refetch } = useRegionEdit(regionLookup.id);

  const { submit, isSubmitting } = useRegionSubmit();

  if (!region && isLoading) {
    return <EntityLoading entity="region" />;
  }

  if (!region && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!region) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "region")}
      formSize="small"
      form={
        <RegionForm
          mode="edit"
          region={region}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: region.id,
              payload,
            })
          }
        />
      }
    />
  );
};

export default EditRegionPage;
