import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerProfile from "@/components/players/sections/PlayerProfile";
import PlayerHistory from "@/components/players/sections/PlayerHistory";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { IMAGES } from "@/constants/images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clubcard,
  MarketValueCard,
  RecordData,
} from "@/components/players/summary";

interface Props {
  title: string;
  player: PlayerDetailResponse;
}

const PlayerDetailPageLayout = ({ title, player }: Props) => {
  const { summary: PlayerSummaryData } = player;
  const {
    name,
    imageUrl,
    shirtNumber,
    dob,
    pob,
    currentNationality,
    height,
    mainPosition,
    marketValue,
    currentClubTeam,
    joinedAt,
    contractEnd,
  } = PlayerSummaryData;

  const summary = (
    <Card>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 space-y-6 p-6">
        {/* Left Content */}
        <div className="lg:grid-cols-8 flex flex-col items-start justify-between gap-6">
          {/* Shirt Number, Name, Position */}
          <div>
            <h1 className="text-4xl font-bold">
              {shirtNumber.club && (
                <span className="mr-2 text-primary">{`#${shirtNumber.club}`}</span>
              )}

              {name}
            </h1>

            <p className="mt-1 text-muted-foreground">{mainPosition.name}</p>
          </div>

          {/* Image */}
          <ImageWrapper
            src={imageUrl ?? IMAGES.COMMON.DEFAULT_PLAYER}
            alt={title}
            clickable
            hoverOverlay
            className={{
              container: "w-1/2 rounded-lg border overflow-hidden",
              image: "w-full object-cover",
            }}
          />

          {/* Player Info */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-6">
            <RecordData
              label="Date of Birth"
              content={{
                text: dob,
              }}
            />

            <RecordData
              label="Place of Birth"
              content={{
                text: pob,
              }}
            />

            <RecordData
              label="Height"
              content={{
                text: height,
              }}
            />

            <RecordData
              label="Nationality"
              content={{
                text: currentNationality.name,
                imageUrl: currentNationality.imageUrl,
              }}
            />

            <RecordData
              label="Position"
              content={{
                text: mainPosition.name,
              }}
            />

            <RecordData
              label="National Player"
              content={{
                text: currentNationality.name,
                imageUrl: currentNationality.imageUrl,
              }}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:grid-cols-4 flex flex-col items-end justify-between gap-8">
          {currentClubTeam && (
            <Clubcard
              club={currentClubTeam}
              joinedAt={joinedAt}
              contractEnd={contractEnd}
            />
          )}

          {/* Market Value */}
          <div className="mt-auto">
            <MarketValueCard value={marketValue} />
          </div>
        </div>
      </CardContent>
    </Card>
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
