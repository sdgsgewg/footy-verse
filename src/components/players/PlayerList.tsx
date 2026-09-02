import { GroupedPlayerListItem, PlayerListItem } from "@/types/player";
import { useRouter } from "@/navigation";
import { TeamType } from "@/enums/TeamType";
import { PlayerCard, PlayerCardWrapper } from "./cards";
import { ROUTES } from "@/constants/routes";

interface Props {
  teamType: TeamType;
  groupedPlayers: GroupedPlayerListItem[];
}

export default function PlayerList({ teamType, groupedPlayers }: Props) {
  const router = useRouter();

  const handleViewPlayer = (player: PlayerListItem) => {
    router.push(`${ROUTES.PLAYERS}/${player.slug}`);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="w-full">
        <h1 className="text-4xl text-dark font-bold uppercase">{`Player List`}</h1>
      </div>
      <div className="w-full grid grid-cols-1 gap-12">
        {groupedPlayers.map((gp) => (
          <div key={gp.category.id} className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold uppercase">
              {gp.category.name}
            </h2>

            <PlayerCardWrapper>
              {gp.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  teamType={teamType}
                  player={player}
                  onNavigate={handleViewPlayer}
                />
              ))}
            </PlayerCardWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
