import FootballPitchBase from "@/components/shared/FootballPitchBase";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_POSITIONS = [
  { x: 50, y: 90, players: 1 },
  { x: 22, y: 74, players: 1 },
  { x: 50, y: 74, players: 2 },
  { x: 78, y: 74, players: 1 },
  { x: 50, y: 61, players: 2 },
  { x: 22, y: 50, players: 1 },
  { x: 50, y: 50, players: 2 },
  { x: 78, y: 50, players: 1 },
  { x: 50, y: 38, players: 1 },
  { x: 20, y: 25, players: 1 },
  { x: 50, y: 26, players: 1 },
  { x: 80, y: 25, players: 1 },
  { x: 50, y: 15, players: 1 },
];

const SquadDepthPitchSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <FootballPitchBase>
        {SKELETON_POSITIONS.map((position, index) => (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Position label */}
              <Skeleton className="mb-1 size-8 rounded-full" />

              {/* Player cards */}
              <div className="flex gap-0.5">
                {Array.from({ length: position.players }).map(
                  (_, playerIndex) => (
                    <Skeleton
                      key={playerIndex}
                      className="h-8 w-16 rounded-lg"
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </FootballPitchBase>
    </div>
  );
};

export default SquadDepthPitchSkeleton;
