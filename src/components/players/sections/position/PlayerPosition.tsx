import { PositionResponse } from "@/types/position";
import PlayerPositionPitch from "./PlayerPositionPitch";
import SubsectionHeader from "../SubsectionHeader";

interface Props {
  mainPosition: PositionResponse;
  otherPositions: PositionResponse[];
}

const PlayerPosition = ({ mainPosition, otherPositions }: Props) => {
  return (
    <section className="flex flex-col border-l">
      <SubsectionHeader title="Positions" />

      <div className="flex flex-1 flex-row gap-4 py-4 px-4 lg:px-6">
        <div className="sm:min-w-40 flex flex-col justify-center gap-6 text-sm">
          <div className="space-y-1">
            <p>Main Position:</p>
            <p className="font-semibold">{mainPosition.name}</p>
          </div>

          {otherPositions && otherPositions.length > 0 && (
            <div className="space-y-1">
              <p>Other Positions:</p>
              {otherPositions.map((position) => (
                <div key={position.id}>
                  <p className="font-semibold">{position.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <PlayerPositionPitch
          mainPosition={mainPosition}
          otherPositions={otherPositions}
        />
      </div>
    </section>
  );
};

export default PlayerPosition;
