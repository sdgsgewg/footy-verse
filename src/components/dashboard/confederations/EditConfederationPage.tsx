"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { ConfederationLookupResponse } from "@/types/confederation";
import {
  useConfederationEdit,
  useConfederationSubmit,
} from "@/hooks/dashboard/confederations";
import ConfederationForm from "@/components/forms/confederations/ConfederationForm";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  confederationLookup: ConfederationLookupResponse;
}

const EditConfederationPage = ({ confederationLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { confederation, isLoading, error, refetch } = useConfederationEdit(
    confederationLookup.id,
  );

  const { submit, isSubmitting } = useConfederationSubmit();

  if (!confederation && isLoading) {
    return <EntityLoading entity="confederation" />;
  }

  if (!confederation && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!confederation) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "confederation")}
      formSize="large"
      form={
        <ConfederationForm
          mode="edit"
          confederation={confederation}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: confederation.id,
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
};

export default EditConfederationPage;
