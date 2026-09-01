"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubForm from "@/components/forms/clubs/ClubForm";
import { useClubEdit, useClubSubmit } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  clubLookup: ClubLookupResponse;
}

const EditClubPage = ({ clubLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { club, isLoading, error, refetch } = useClubEdit(clubLookup.id);

  const { submit, isSubmitting } = useClubSubmit();

  // Initial request is still loading and no cached club data is available yet.
  if (!club && isLoading) {
    return <EntityLoading entity="club" />;
  }

  // Initial request failed before any club data could be loaded.
  if (!club && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no club data is available even though loading has finished.
  if (!club) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "club")}
      formSize="large"
      form={
        <ClubForm
          mode="edit"
          club={club}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: club.id,
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.CLUBS.BASE);
              },
            })
          }
        />
      }
    />
  );
};

export default EditClubPage;
