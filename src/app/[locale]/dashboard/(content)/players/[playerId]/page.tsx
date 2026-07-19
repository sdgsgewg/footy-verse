"use client";

import NotFound from "@/components/feedback/NotFound";
import PageLoading from "@/components/feedback/PageLoading";
import PlayerDetailPageLayout from "@/components/layout/detail-page/PlayerDetailPageLayout";
import { usePlayer } from "@/hooks/dashboard/players";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
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

  const { image, name } = player;

  const modifiedImage =
    getImageUrl(STORAGE_BUCKETS.PLAYERS, image) ?? getDefaultImage("player");

  return (
    <PlayerDetailPageLayout
      title={name}
      imageUrl={modifiedImage}
      player={player}
    />
  );
};

export default ViewPlayerPage;
