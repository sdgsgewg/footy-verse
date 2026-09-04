import { PositionResponse } from "@/types/position";
import PositionMarker from "./PositionMarker";
import FootballPitchBase from "@/components/shared/FootballPitchBase";
import {
  getPositionCoordinate,
  getPositionLabel,
} from "@/lib/positions/positionMetadata";

interface Props {
  mainPosition: PositionResponse;
  otherPositions: PositionResponse[];
}

const PlayerPositionPitch = ({ mainPosition, otherPositions }: Props) => {
  const mainCoordinate = getPositionCoordinate(mainPosition.name);

  const otherPositionMarkers = otherPositions
    .map((position) => {
      const coordinate = getPositionCoordinate(position.name);

      if (!coordinate) {
        return null;
      }

      return {
        id: position.id,
        name: position.name,
        ...coordinate,
      };
    })
    .filter(
      (
        position,
      ): position is {
        id: string;
        name: string;
        x: number;
        y: number;
      } => position !== null,
    );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-xs xl:max-w-3xs mx-auto">
        <FootballPitchBase>
          {/* Other positions */}
          {otherPositionMarkers.map((position) => (
            <PositionMarker
              key={position.id}
              label={getPositionLabel(position.name)}
              title={position.name}
              x={position.x}
              y={position.y}
            />
          ))}

          {/* Main position */}
          {mainCoordinate && (
            <PositionMarker
              label={getPositionLabel(mainPosition.name)}
              title={mainPosition.name}
              x={mainCoordinate.x}
              y={mainCoordinate.y}
              isMain
            />
          )}
        </FootballPitchBase>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-primary" />
          Main position
        </div>

        {otherPositionMarkers.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full border-2 border-primary bg-background" />
            Other positions
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerPositionPitch;
