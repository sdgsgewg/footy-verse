"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClub } from "@/hooks/dashboard/clubs";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
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

  const { image, name } = club;

  const modifiedImage =
    getImageUrl(STORAGE_BUCKETS.CLUBS, image) ?? getDefaultImage("club");

  return (
    <ClubDetailPageLayout title={name} imageUrl={modifiedImage} club={club} />
  );
};

export default ViewClubPage;
