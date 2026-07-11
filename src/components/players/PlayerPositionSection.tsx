import { getMainPosition, getOtherPositions } from "@/lib/players/formatter";
import { PlayerPosition } from "@/types/player";

interface PlayerPositionSectionProps {
  positions: PlayerPosition[];
}

const PlayerPositionSection = ({ positions }: PlayerPositionSectionProps) => {
  const mainPosition = getMainPosition(positions);
  const otherPositions = getOtherPositions(positions);

  return (
    <div className="bg-card grid grid-cols-3 border-b-2 border-accent px-5 py-3">
      <p className="text-large font-bold uppercase text-start">Position:</p>
      {/* Main Position */}
      <div className="flex flex-col items-start text-large font-medium col-span-1 text-start">
        <p>Main Position:</p>
        <p>{mainPosition.position.name}</p>
      </div>

      {/* Other Positions */}
      {otherPositions.length > 0 && (
        <div className="flex flex-col text-large font-medium col-span-1 text-start">
          <p>Other Position:</p>
          {otherPositions.map((pp) => (
            <p key={pp.position_id}>{pp.position.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerPositionSection;
