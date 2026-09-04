import PlayerProfile from "./profile/PlayerProfile";
import { PlayerDetailResponse } from "@/types/player";
import { PlayerPosition } from "./position";
import SectionHeader from "./SectionHeader";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerData = ({ player }: Props) => {
  return (
    <section className="overflow-hidden border border-accent">
      <SectionHeader title="Player Data" />

      <div className="grid grid-cols-1 xl:grid-cols-2">
        <PlayerProfile player={player} />

        <PlayerPosition
          mainPosition={player.profile.mainPosition}
          otherPositions={player.profile.otherPositions}
        />
      </div>
    </section>
  );
};

export default PlayerData;
