import React from "react";
import RecordData from "../shared/RecordData";
import PlayerPositionSection from "./PlayerPositionSection";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import {
  formatMarketValue,
  getCurrentClub,
  getDateOfBirth,
  getHeight,
  getWeight,
} from "@/lib/players/formatter";
import { PlayerDetailResponse } from "@/types/player";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import SectionHeader from "./SectionHeader";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerProfile = ({ player }: Props) => {
  const { name, pob, preferred_foot, national_teams } = player;

  const height = getHeight(player.height);
  const weight = getWeight(player.weight);
  const dob = getDateOfBirth(player);
  const marketValue = formatMarketValue(player.market_value);

  const currentClub = getCurrentClub(player);

  return (
    <div className="">
      <SectionHeader title="Player Profile" />

      <RecordData label="Name" value={name} />

      {/* Position */}
      <PlayerPositionSection positions={player.positions} />

      <RecordData label="Date of Birth" value={dob} />
      <RecordData label="Place of Birth" value={pob} />
      <RecordData label="Height" value={height} />
      <RecordData label="Weight" value={weight} />
      <RecordData label="Preferred Foot" value={preferred_foot} />

      {/* Nationalities */}
      <RecordData label="Nationality">
        <div className="flex flex-col gap-1">
          {national_teams.map((pnt) => (
            <div
              key={pnt.nation_id}
              className="flex flex-row items-center gap-2"
            >
              <Image
                src={
                  getImageUrl(
                    STORAGE_BUCKETS.NATIONALITIES,
                    pnt.nationality.image,
                  ) ?? IMAGES.COMMON.DEFAULT
                }
                alt={pnt.nationality.name}
                width={24}
                height={16}
                className="w-6 h-4"
              />
              <p>{pnt.nationality.name}</p>
            </div>
          ))}
        </div>
      </RecordData>

      {/* Current Club */}
      {currentClub && (
        <RecordData label="Club">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                getImageUrl(STORAGE_BUCKETS.CLUBS, currentClub.image) ??
                IMAGES.COMMON.DEFAULT
              }
              alt={currentClub.name ?? "-"}
              className="w-4 h-4"
              width={16}
              height={16}
            />
            <p>{currentClub.name}</p>
          </div>
        </RecordData>
      )}

      <RecordData label="Market Value" value={`${marketValue}`} />
    </div>
  );
};

export default PlayerProfile;
