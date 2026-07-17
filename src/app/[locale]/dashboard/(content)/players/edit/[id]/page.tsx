"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import PlayerForm from "@/components/forms/players/PlayerForm";
import FormSectionLayout from "@/components/layout/FormSectionLayout";
import ManagePageWrapper from "@/components/manage/ManagePageWrapper";
import { CrudPageHeader } from "@/components/templates/crud";
import { usePlayer, usePlayerSubmit } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditPlayerPage = () => {
  const t = useTranslations("dashboard.players");
  const tEdit = useTranslations("dashboard.players.edit");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { id } = useParams() as {
    id: string;
  };

  const { player, loading } = usePlayer({
    id,
  });

  const { submit, isSubmitting } = usePlayerSubmit();

  if (loading) {
    return (
      <PageLoading
        message={tCommonStates("loadingEntity", {
          entity: tEntities("player").toLowerCase(),
        })}
      />
    );
  }

  if (!player) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <ManagePageWrapper>
      <CrudPageHeader title={tEdit("title")} showBackButton />

      <FormSectionLayout formSize="large">
        <PlayerForm
          mode="edit"
          player={player}
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

export default EditPlayerPage;
