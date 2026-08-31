import { PositionResponse } from "@/types/position";
import PositionMarker from "./PositionMarker";
import { getPositionCoordinate, getPositionLabel } from "./positionCoordinates";

interface Props {
  mainPosition: PositionResponse;
  otherPositions: PositionResponse[];
}

const FootballPitch = ({ mainPosition, otherPositions }: Props) => {
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
    <div className="w-full max-w-xs xl:h-full flex-1 flex flex-col items-center mx-auto">
      <div
        className="
          relative w-full xl:max-w-2xs aspect-3/4 xl:aspect-auto xl:flex-1 overflow-hidden
          rounded-xl border bg-emerald-700
          shadow-sm
        "
      >
        {/* Outer pitch line */}
        <div className="absolute inset-3 border-2 border-white/80" />

        {/* Halfway line */}
        <div className="absolute top-1/2 right-3 left-3 h-0.5 -translate-y-1/2 bg-white/80" />

        {/* Centre circle */}
        <div
          className="
            absolute top-1/2 left-1/2
            size-20
            -translate-x-1/2 -translate-y-1/2
            rounded-full border-2 border-white/80
          "
        />

        {/* Centre spot */}
        <div
          className="
            absolute top-1/2 left-1/2
            size-2
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-white/80
          "
        />

        {/* Top penalty area */}
        <div
          className="
            absolute top-3 left-1/2
            h-[18%] w-[55%]
            -translate-x-1/2
            border-x-2 border-b-2 border-white/80
          "
        />

        {/* Top goal area */}
        <div
          className="
            absolute top-3 left-1/2
            h-[8%] w-[28%]
            -translate-x-1/2
            border-x-2 border-b-2 border-white/80
          "
        />

        {/* Bottom penalty area */}
        <div
          className="
            absolute bottom-3 left-1/2
            h-[18%] w-[55%]
            -translate-x-1/2
            border-x-2 border-t-2 border-white/80
          "
        />

        {/* Bottom goal area */}
        <div
          className="
            absolute bottom-3 left-1/2
            h-[8%] w-[28%]
            -translate-x-1/2
            border-x-2 border-t-2 border-white/80
          "
        />

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
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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

export default FootballPitch;
