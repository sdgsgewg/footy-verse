import PlayerProfile from "./profile/PlayerProfile";
import { PlayerDetailResponse } from "@/types/player";
import { PlayerPositionPitch } from "./position";
import SectionHeader from "./SectionHeader";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerData = ({ player }: Props) => {
  return (
    <section className="overflow-hidden border border-accent">
      <SectionHeader title="Player Data" />

      <div className="grid grid-cols-1 items-stretch xl:grid-cols-2">
        <PlayerProfile player={player} />

        <PlayerPositionPitch
          mainPosition={player.profile.mainPosition}
          otherPositions={player.profile.otherPositions}
        />
      </div>
    </section>
  );
};

export default PlayerData;
