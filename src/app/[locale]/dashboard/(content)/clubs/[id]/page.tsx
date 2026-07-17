"use client";

import Loading from "@/components/feedback/Loading";
import NotFound from "@/components/feedback/NotFound";
import ClubDetail from "@/components/manage/clubs/ClubDetail";
import { useClub } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewClubPage = () => {
  const t = useTranslations("dashboard.clubs");

  const { id } = useParams() as {
    id: string;
  };

  const { club, loading } = useClub({ id });

  if (loading) {
    return <Loading />;
  }

  if (!club) {
    return <NotFound text={t("notFound")} />;
  }

  return <ClubDetail club={club} />;
};

export default ViewClubPage;
