import ImageWrapper from "@/components/shared/ImageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { IMAGES } from "@/constants/images";
import { PlayerSummaryResponse } from "@/types/player";
import React from "react";
import RecordData from "./RecordData";
import ClubCard from "./ClubCard";
import MarketValueCard from "./MarketValueCard";

interface Props {
  summary: PlayerSummaryResponse;
}

const PlayerSummary = ({ summary }: Props) => {
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
  } = summary;

  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 space-y-6 p-6">
        {/* Left Content */}
        <div className="md:grid-cols-10 flex flex-col items-start justify-between gap-6">
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
            alt={name}
            clickable
            hoverOverlay
            className={{
              container: "w-1/2 rounded-lg border overflow-hidden",
              image: "w-full object-cover",
            }}
          />

          {/* Player Info */}
          <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
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
        <div className="md:grid-cols-2 flex flex-col sm:flex-row md:flex-col md:items-end justify-between gap-8">
          {currentClubTeam && (
            <ClubCard
              club={currentClubTeam}
              joinedAt={joinedAt}
              contractEnd={contractEnd}
            />
          )}

          {/* Market Value */}
          <div className="w-full flex sm:items-end sm:justify-end mt-auto">
            <MarketValueCard value={marketValue} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerSummary;
