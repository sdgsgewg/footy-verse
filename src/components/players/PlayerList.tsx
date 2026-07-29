import { PlayerCard } from "./cards";
import { GroupedPlayerListItem, PlayerListItem } from "@/types/player";
import { useRouter } from "@/navigation";
import { TeamType } from "@/enums/TeamType";
import EmptyState from "../feedback/EmptyState";
import { Users } from "lucide-react";

interface Props {
  teamType: TeamType;
  groupedPlayers: GroupedPlayerListItem[];
  baseRoute: string;
}

export default function PlayerList({
  teamType,
  groupedPlayers,
  baseRoute,
}: Props) {
  const router = useRouter();

  const handleViewPlayer = (player: PlayerListItem) => {
    router.push(`${baseRoute}/players/${player.slug}`);
  };

  if (groupedPlayers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No players found"
        description="There are no players registered for this team."
      />
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="w-full">
        <h1 className="text-4xl text-dark font-bold uppercase">{`Player List`}</h1>
      </div>
      <div className="w-full grid grid-cols-1 gap-8">
        {groupedPlayers.map((gp) => (
          <div key={gp.category.id} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold uppercase">
              {gp.category.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {gp.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  teamType={teamType}
                  player={player}
                  onNavigate={() => handleViewPlayer(player)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
