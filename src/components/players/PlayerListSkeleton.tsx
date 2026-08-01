import { Skeleton } from "@/components/ui/skeleton";
import PlayerCardSkeleton from "./cards/PlayerCardSkeleton";

const PLAYER_GROUPS = 3;
const PLAYERS_PER_GROUP = 4;

export default function PlayerListSkeleton() {
  return (
    <div className="flex flex-col space-y-8">
      <Skeleton className="h-10 w-64" />

      <div className="grid w-full grid-cols-1 gap-12">
        {Array.from({
          length: PLAYER_GROUPS,
        }).map((_, groupIndex) => (
          <section key={groupIndex} className="flex flex-col gap-6">
            <Skeleton className="h-7 w-36" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({
                length: PLAYERS_PER_GROUP,
              }).map((_, playerIndex) => (
                <PlayerCardSkeleton key={playerIndex} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
