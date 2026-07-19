"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import NationalTeamDetailPageLayout from "@/components/layout/detail-page/NationalTeamDetailPageLayout";
import { useNationality } from "@/hooks/dashboard/nationalities";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewNationalityPage = () => {
  const t = useTranslations("dashboard.nationalities");
  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { slug } = useParams() as {
    slug: string;
  };

  const { nationality, loading } = useNationality({ slug });

  if (loading) {
    return (
      <PageLoading
        message={tCommonStates("loadingEntity", {
          entity: tEntities("nationality").toLowerCase(),
        })}
      />
    );
  }

  if (!nationality) {
    return <NotFound text={t("notFound")} />;
  }

  const { image, name } = nationality;

  const modifiedImage =
    getImageUrl(STORAGE_BUCKETS.NATIONALITIES, image) ??
    getDefaultImage("nationality");

  return (
    <NationalTeamDetailPageLayout
      title={name}
      imageUrl={modifiedImage}
      nationalTeam={nationality}
    />
  );
};

export default ViewNationalityPage;
