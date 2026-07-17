"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import ClubDetail from "@/components/manage/clubs/ClubDetail";
import { useClub } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewClubPage = () => {
  const t = useTranslations("dashboard.clubs");
  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { id } = useParams() as {
    id: string;
  };

  const { club, loading } = useClub({ id });

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

  return <ClubDetail club={club} />;
};

export default ViewClubPage;
