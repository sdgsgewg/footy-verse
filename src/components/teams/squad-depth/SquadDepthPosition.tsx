import { SquadDepthPosition as SquadDepthPositionData } from "@/types/teams/squad-depth";
import { cn } from "@/lib/utils";
import { POSITIONS } from "@/constants/positions";
import { getPositionLabel } from "@/lib/positions/positionMetadata";

interface Props {
  positionData: SquadDepthPositionData;
}

const SquadDepthPosition = ({ positionData }: Props) => {
  const { position, players } = positionData;

  const isGoalkeeper = getPositionLabel(position.name) === "GK";

  const isCentreBack = getPositionLabel(position.name) === "CB";

  const modifiedPlayers = isCentreBack
    ? players.slice(0, 6)
    : players.slice(0, 2);

  return (
    <div className="flex flex-col items-center">
      {/* Position label */}
      <span className="mb-1 text-xs font-bold bg-primary border border-primary-foreground text-primary-foreground rounded-full drop-shadow-sm p-2">
        {getPositionLabel(position.name)}
      </span>

      {/* Players */}
      <div
        className={
          players.length >= 4 && isCentreBack
            ? "grid grid-cols-2 justify-items-center gap-0.5"
            : isGoalkeeper
              ? "flex items-center gap-0.5"
              : "flex flex-col gap-0.5"
        }
      >
        {modifiedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              "flex w-20 flex-col items-center",
              "rounded-lg border",
              index === 0 ||
                (index === 1 &&
                  player.mainPosition.name === POSITIONS.CENTRE_BACK)
                ? "bg-background"
                : "bg-accent",
              "p-1.5",
              "shadow-md",
            )}
          >
            <span className="w-full truncate text-center text-[10px] font-medium">
              {player.shortName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadDepthPosition;
