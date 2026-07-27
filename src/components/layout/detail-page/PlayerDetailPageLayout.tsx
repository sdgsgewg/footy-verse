import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerProfile from "@/components/players/sections/PlayerProfile";
import PlayerHistory from "@/components/players/sections/PlayerHistory";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface Props {
  title: string;
  imageUrl: string;
  player: PlayerDetailResponse;
}

const PlayerDetailPageLayout = ({ title, imageUrl, player }: Props) => {
  const { summary: PlayerSummaryData } = player;
  const { name } = PlayerSummaryData;

  const summary = (
    <>
      <div
        className="w-full flex overflow-hidden"
        // style={{ width: "100%", height: "350px" }}
      >
        <ImageWrapper
          src={imageUrl}
          alt={title}
          className={{
            container: "w-full max-w-sm",
          }}
          hoverOverlay
          clickable
        />
      </div>

      <div className="flex-1">
        <p>{name}</p>
      </div>
    </>
  );

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PlayerProfile player={player} />
      <PlayerHistory player={player} />
    </div>
  );

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default PlayerDetailPageLayout;
