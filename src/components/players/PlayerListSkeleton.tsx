import { Skeleton } from "@/components/ui/skeleton";
import { PlayerCardSkeleton, PlayerCardWrapper } from "./cards";

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

            <PlayerCardWrapper>
              {Array.from({
                length: PLAYERS_PER_GROUP,
              }).map((_, playerIndex) => (
                <PlayerCardSkeleton key={playerIndex} />
              ))}
            </PlayerCardWrapper>
          </section>
        ))}
      </div>
    </div>
  );
}
