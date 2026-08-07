"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import {
  useNationalityEdit,
  useNationalitySubmit,
} from "@/hooks/dashboard/nationalities";
import NationalityForm from "@/components/forms/nationalities/NationalityForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const EditNationalityPage = ({ nationalityLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { nationality, isLoading, error, refetch } = useNationalityEdit(
    nationalityLookup.id,
  );

  const { submit, isSubmitting } = useNationalitySubmit();

  // Initial request is still loading and no cached nationality data is available yet.
  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  // Initial request failed before any nationality data could be loaded.
  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no nationality data is available even though loading has finished.
  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "nationality")}
      formSize="small"
      form={
        <NationalityForm
          mode="edit"
          nationality={nationality}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: nationality.id,
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE);
              },
            })
          }
        />
      }
    />
  );
};

export default EditNationalityPage;
