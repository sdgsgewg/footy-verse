import { getImageUrl } from "@/lib/images/image-url";
import PlayerProfile from "./PlayerProfile";
import PlayerHistory from "./PlayerHistory";
import DetailPageLayout from "../layout/DetailPageLayout";
import { getDefaultImage } from "@/lib/images/default-image";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { PlayerDetailResponse } from "@/types/player";

interface PlayerDetailContentProps {
  player: PlayerDetailResponse;
}

const PlayerDetailContent = ({ player }: PlayerDetailContentProps) => {
  const { image, name } = player;

  const modifiedImage =
    getImageUrl(STORAGE_BUCKETS.PLAYERS, image) ?? getDefaultImage("player");

  return (
    <DetailPageLayout title={name} image={modifiedImage}>
      <PlayerProfile player={player} />
      <PlayerHistory />
    </DetailPageLayout>
  );
};

export default PlayerDetailContent;
