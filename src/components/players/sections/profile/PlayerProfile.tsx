import React from "react";
import { PlayerDetailResponse } from "@/types/player";
import RecordData from "./RecordData";
import PlayerNationalitiesRecordData from "./PlayerNationalitiesRecordData";
import PlayerCurrentClubRecordData from "./PlayerCurrentClubRecordData";

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
    nationalities,
    currentClubTeam,
  } = player.profile;

  return (
    <div className="h-full">
      <RecordData label="Name" value={name} />

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
