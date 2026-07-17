"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import ClubForm from "@/components/forms/clubs/ClubForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { useClub, useClubSubmit } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditClubPage = () => {
  const t = useTranslations("dashboard.clubs");
  const tEdit = useTranslations("dashboard.clubs.edit");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const params = useParams();

  const id = params.id as string;

  const { club, loading } = useClub({
    id,
  });

  const { submit, isSubmitting } = useClubSubmit();

  if (loading) {
    return (
      <PageLoading
        message={tCommonStates("loadingEntity", {
          entity: tEntities("club").toLowerCase(),
        })}
      />
    );
  }

  if (!club) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <ManagePageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionLayout formSize="small">
        <ClubForm
          mode="edit"
          club={club}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id,
              payload,
            })
          }
        />
      </FormSectionLayout>
    </ManagePageWrapper>
  );
};

export default EditClubPage;
