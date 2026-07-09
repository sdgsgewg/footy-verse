import { IMAGES } from "@/constants/images";
import {
  getClubImageUrl,
  getNationalityImageUrl,
  getPlayerImageUrl,
} from "@/lib/get-image-url";
import { PlayerWithDetails } from "@/lib/repositories/players.repo";
import Image from "next/image";
import React from "react";
import PlayerData from "./PlayerData";
import {
  formatMarketValue,
  getCurrentClub,
  getDateOfBirth,
  getHeight,
  getWeight,
} from "@/lib/players/player.util";
import { useRouter } from "next/navigation";
import PlayerPositionSection from "./PlayerPositionSection";

interface PlayerDetailContentProps {
  player: PlayerWithDetails;
  //   onBack?: () => void;
}

const PlayerDetailContent = ({ player }: PlayerDetailContentProps) => {
  const router = useRouter();

  const { image, name, pob, preferred_foot, careers, national_teams } = player;

  const height = getHeight(player.height);
  const weight = getWeight(player.weight);
  const dob = getDateOfBirth(player);
  const marketValue = formatMarketValue(player.market_value);

  const currentClub = getCurrentClub(player);

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="space-y-12">
      {/* Player Name and Image */}
      <div className="max-w-xl mx-auto">
        <h1 className="text-5xl text-primary font-bold uppercase">{name}</h1>

        <div
          className="flex justify-center overflow-hidden my-8"
          style={{ width: "100%", height: "350px" }}
        >
          <Image
            src={getPlayerImageUrl(image) ?? IMAGES.COMMON.DEFAULT}
            alt={name}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Player Profile */}
        <div className="">
          <div className="bg-primary text-primary-foreground text-2xl font-bold px-5 py-3 uppercase mb-2">
            <p className="text-start">Player Profile</p>
          </div>

          <PlayerData label="Name" value={name} />

          {/* Position */}
          <PlayerPositionSection positions={player.positions} />

          <PlayerData label="Date of Birth" value={dob} />
          <PlayerData label="Place of Birth" value={pob} />
          <PlayerData label="Height" value={height} />
          <PlayerData label="Weight" value={weight} />
          <PlayerData label="Preferred Foot" value={preferred_foot} />

          {/* Nationalities */}
          <PlayerData label="Nationality">
            <div className="flex flex-col gap-1">
              {national_teams.map((pnt) => (
                <div
                  key={pnt.nation_id}
                  className="flex flex-row items-center gap-2"
                >
                  <Image
                    src={
                      getNationalityImageUrl(pnt.nationality.image) ??
                      IMAGES.COMMON.DEFAULT
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
          </PlayerData>

          {/* Curren Club */}
          {currentClub && (
            <PlayerData label="Club">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={
                    getClubImageUrl(currentClub.image) ?? IMAGES.COMMON.DEFAULT
                  }
                  alt={currentClub.name ?? "-"}
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                <p>{currentClub.name}</p>
              </div>
            </PlayerData>
          )}

          <PlayerData label="Market Value" value={`${marketValue}`} />
        </div>

        {/* Player Clubs & National Teams History */}
        <div className="flex flex-col gap-8">
          {/* Clubs History */}
          <h1>Club History</h1>

          {/* National Teams History */}
          <h1>National Team History</h1>
        </div>
      </div>

      {/* Back to Previous Page */}
      <div className="max-w-xl mx-auto flex items-center justify-center ">
        <button
          className="bg-primary text-primary-foreground px-8 py-2 rounded-xl hover:bg-primary/80 cursor-pointer"
          onClick={handleNavigateBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PlayerDetailContent;
