import React from "react";
import { PlayerDetailResponse } from "@/types/player";
import SectionHeader from "./SectionHeader";
import RecordData from "../profile/RecordData";
import PlayerPositionRecordData from "../profile/PlayerPositionRecordData";
import PlayerNationalitiesRecordData from "../profile/PlayerNationalitiesRecordData";
import PlayerCurrentClubRecordData from "../profile/PlayerCurrentClubRecordData";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerProfile = ({ player }: Props) => {
  const {
    name,
    dob,
    pob,
    height,
    weight,
    preferredFoot,
    marketValue,
    mainPosition,
    otherPositions,
    nationalities,
    currentClubTeam,
  } = player.profile;

  return (
    <div className="">
      <SectionHeader title="Player Profile" />

      <RecordData label="Name" value={name} />

      {/* Position */}
      <PlayerPositionRecordData
        mainPosition={mainPosition}
        otherPositions={otherPositions}
      />

      <RecordData label="Date of Birth" value={dob} />
      <RecordData label="Place of Birth" value={pob} />
      <RecordData label="Height" value={height} />
      <RecordData label="Weight" value={weight} />
      <RecordData label="Preferred Foot" value={preferredFoot} />

      {/* Nationalities */}
      {nationalities && nationalities.length > 0 && (
        <PlayerNationalitiesRecordData nationalities={nationalities} />
      )}

      {/* Current Club */}
      {currentClubTeam && (
        <PlayerCurrentClubRecordData club={currentClubTeam} />
      )}

      <RecordData label="Market Value" value={marketValue} />
    </div>
  );
};

export default PlayerProfile;
