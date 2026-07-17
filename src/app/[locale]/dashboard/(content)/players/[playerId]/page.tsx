"use client";

import Loading from "@/components/feedback/Loading";
import NotFound from "@/components/feedback/NotFound";
import PlayerDetailContent from "@/components/players/PlayerDetailContent";
import { usePlayer } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewPlayerPage = () => {
  const t = useTranslations("dashboard.players");

  const { playerId } = useParams() as {
    playerId: string;
  };

  const { player, loading } = usePlayer({ id: playerId });

  if (loading) {
    return <Loading />;
  }

  if (!player) {
    return <NotFound text={t("notFound")} />;
  }

  return <PlayerDetailContent player={player} />;
};

export default ViewPlayerPage;
