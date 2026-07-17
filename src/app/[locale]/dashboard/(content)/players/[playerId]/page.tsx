"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import PlayerDetailContent from "@/components/players/PlayerDetailContent";
import { usePlayer } from "@/hooks/dashboard/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ViewPlayerPage = () => {
  const t = useTranslations("dashboard.players");
  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const { playerId } = useParams() as {
    playerId: string;
  };

  const { player, loading } = usePlayer({ id: playerId });

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

  return <PlayerDetailContent player={player} />;
};

export default ViewPlayerPage;
