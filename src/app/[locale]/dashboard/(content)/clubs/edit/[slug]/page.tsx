"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import ClubForm from "@/components/forms/clubs/ClubForm";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { useClub, useClubSubmit } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditClubPage = () => {
  const t = useTranslations("dashboard.clubs");
  const tEdit = useTranslations("dashboard.clubs.edit");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { slug } = useParams() as {
    slug: string;
  };

  const { club, loading } = useClub({
    slug,
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
    <DashboardPageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionWrapper formSize="small">
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
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
};

export default EditClubPage;
