import FootballPitchBase from "@/components/shared/FootballPitchBase";
import { SquadDepthResponse } from "@/types/teams/squad-depth";
import SquadDepthPosition from "./SquadDepthPosition";
import { getPositionCoordinate } from "@/lib/positions/positionMetadata";

interface Props {
  squadDepth: SquadDepthResponse;
}

const SquadDepthPitch = ({ squadDepth }: Props) => {
  return (
    <div className="mx-auto w-full max-w-md">
      <FootballPitchBase>
        {squadDepth.flatMap((category) =>
          category.positions.map((positionData) => {
            const coordinate = getPositionCoordinate(
              positionData.position.name,
            );

            if (!coordinate) {
              return null;
            }

            return (
              <div
                key={positionData.position.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${coordinate.x}%`,
                  top: `${coordinate.y}%`,
                }}
              >
                <SquadDepthPosition positionData={positionData} />
              </div>
            );
          }),
        )}
      </FootballPitchBase>
    </div>
  );
};

export default SquadDepthPitch;
