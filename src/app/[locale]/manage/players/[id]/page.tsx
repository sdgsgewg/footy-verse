"use client";

import Loading from "@/components/feedback/Loading";
import NotFound from "@/components/feedback/NotFound";
import PlayerDetailContent from "@/components/players/PlayerDetailContent";
import { usePlayer } from "@/hooks/manage/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewPlayerPage = () => {
  const t = useTranslations("manage.players");

  const { id } = useParams() as {
    id: string;
  };

  const { player, loading } = usePlayer({ id });

  if (loading) {
    return <Loading />;
  }

  if (!player) {
    return <NotFound text={t("notFound")} />;
  }

  return <PlayerDetailContent player={player} />;
};

export default ViewPlayerPage;
