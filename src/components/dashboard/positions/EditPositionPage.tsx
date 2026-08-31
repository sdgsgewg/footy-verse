"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { PositionLookupResponse } from "@/types/position";
import {
  usePositionEdit,
  usePositionSubmit,
} from "@/hooks/dashboard/positions";
import PositionForm from "@/components/forms/positions/PositionForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ENTITY_CONFIG } from "@/config/entities";

interface Props {
  positionLookup: PositionLookupResponse;
}

const EditPositionPage = ({ positionLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { position, isLoading, error, refetch } = usePositionEdit(
    positionLookup.id,
  );

  const { submit, isSubmitting } = usePositionSubmit();

  // Initial request is still loading and no cached position data is available yet.
  if (!position && isLoading) {
    return <EntityLoading entity="position" />;
  }

  // Initial request failed before any position data could be loaded.
  if (!position && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no position data is available even though loading has finished.
  if (!position) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "position")}
      formSize="small"
      form={
        <PositionForm
          mode="edit"
          position={position}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: position.id,
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
};

export default EditPositionPage;
