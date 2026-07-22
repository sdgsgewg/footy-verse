import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubForm from "@/components/forms/clubs/ClubForm";
import { useClubEdit, useClubSubmit } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import { useTranslations } from "next-intl";
import React from "react";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";

interface Props {
  clubLookup: ClubLookupResponse;
}

const EditClubPage = ({ clubLookup }: Props) => {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

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
      title={t("title", {
        entity: tEntities("club"),
      })}
      formSize="small"
      form={
        <ClubForm
          mode="edit"
          club={club}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: club.id,
              payload,
            })
          }
        />
      }
    />
  );
};

export default EditClubPage;
