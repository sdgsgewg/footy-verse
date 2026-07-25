"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import React from "react";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import {
  useNationalityEdit,
  useNationalitySubmit,
} from "@/hooks/dashboard/nationalities";
import NationalityForm from "@/components/forms/nationalities/NationalityForm";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const EditNationalityPage = ({ nationalityLookup }: Props) => {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

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
      title={t("title", {
        entity: tEntities("nationality"),
        entityName: "",
      })}
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
            })
          }
        />
      }
    />
  );
};

export default EditNationalityPage;
