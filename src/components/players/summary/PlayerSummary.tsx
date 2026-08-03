import ImageWrapper from "@/components/shared/ImageWrapper";
import { IMAGES } from "@/constants/images";
import { PlayerSummaryResponse } from "@/types/player";
import React from "react";
import RecordData from "../../shared/summary/RecordData";
import ClubCard from "./ClubCard";
import MarketValueCard from "../../shared/summary/MarketValueCard";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";

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
    currentNationalTeam,
    joinedAt,
    contractEnd,
  } = summary;

  return (
    <EntitySummaryLayout
      title={
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">
            {shirtNumber.clubTeam && (
              <span className="mr-2 text-primary">#{shirtNumber.clubTeam}</span>
            )}
            {name}
          </h1>

          <p className="text-muted-foreground">{mainPosition.name}</p>
        </div>
      }
      image={
        <ImageWrapper
          src={imageUrl ?? IMAGES.COMMON.DEFAULT_PLAYER}
          alt={name}
          clickable
          hoverOverlay
          aspectRatio="video"
          className={{
            container: "w-full min-w-72 max-w-72 rounded-lg border",
            image: "object-cover",
          }}
        />
      }
      information={
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

          {currentNationalTeam && (
            <RecordData
              label="National Player"
              content={{
                text: currentNationalTeam.name,
                imageUrl: currentNationalTeam.imageUrl,
              }}
            />
          )}
        </div>
      }
      side={
        currentClubTeam && (
          <ClubCard
            club={currentClubTeam}
            joinedAt={joinedAt}
            contractEnd={contractEnd}
          />
        )
      }
      footer={<MarketValueCard value={marketValue} />}
    />
  );
};

export default PlayerSummary;
