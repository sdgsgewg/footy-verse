import { PositionResponse } from "@/types/position";
import FootballPitch from "./FootballPitch";

interface Props {
  mainPosition: PositionResponse;
  otherPositions: PositionResponse[];
}

const PlayerPositionPitch = ({ mainPosition, otherPositions }: Props) => {
  return (
    <section className="flex h-full min-w-0 flex-col border-l">
      <div className="flex items-center bg-secondary px-4 py-1 uppercase mb-1">
        <p className="text-start text-primary-foreground text-lg font-semibold">
          {`Positions`}
        </p>
      </div>

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
