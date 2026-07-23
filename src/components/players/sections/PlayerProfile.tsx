import React from "react";
import { PlayerDetailResponse } from "@/types/player";
import SectionHeader from "./SectionHeader";
import RecordData from "../record/RecordData";
import PlayerPositionRecordData from "../record/PlayerPositionRecordData";
import PlayerNationalitiesRecordData from "../record/PlayerNationalitiesRecordData";
import PlayerCurrentClubRecordData from "../record/PlayerCurrentClubRecordData";

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
    nationalTeams,
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
      {nationalTeams && nationalTeams.length > 0 && (
        <PlayerNationalitiesRecordData nationalities={nationalTeams} />
      )}

      {/* Current Club */}
      {currentClubTeam && <PlayerCurrentClubRecordData club={currentClubTeam} />}

      <RecordData label="Market Value" value={marketValue} />
    </div>
  );
};

export default PlayerProfile;
