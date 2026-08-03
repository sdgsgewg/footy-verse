import { PositionResponse } from "@/types/position";
import FootballPitch from "./FootballPitch";
import SubsectionHeader from "../SubsectionHeader";

interface Props {
  mainPosition: PositionResponse;
  otherPositions: PositionResponse[];
}

const PlayerPositionPitch = ({ mainPosition, otherPositions }: Props) => {
  return (
    <section className="flex flex-col min-w-0 border-l">
      <SubsectionHeader title="Positions" />

      <div className="flex flex-1 flex-row gap-4 py-4 px-6">
        <div className="flex flex-col justify-center gap-6 text-sm">
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

        <FootballPitch
          mainPosition={mainPosition}
          otherPositions={otherPositions}
        />
      </div>
    </section>
  );
};

export default PlayerPositionPitch;
