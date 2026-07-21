import { PlayerCard } from "./cards";
import { PlayerListItem } from "@/types/player";
import { TeamType } from "@/types/team";
import { useRouter } from "@/navigation";

interface Props {
  teamType: TeamType;
  players: PlayerListItem[];
  baseRoute: string;
}

export default function PlayerList({ teamType, players, baseRoute }: Props) {
  const router = useRouter();

  if (players.length === 0) return null; // Tidak tampilkan jika kosong

  const handleViewPlayer = (player: PlayerListItem) => {
    router.push(`${baseRoute}/players/${player.slug}`);
  };

  return (
    <div className="flex flex-col px-4">
      <div className="w-full flex justify-center items-center mb-8">
        <h1 className="text-4xl text-dark font-bold uppercase">{`Player List`}</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center mb-20 xl:w-10/12 xl:mx-auto">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            teamType={teamType}
            player={player}
            onNavigate={handleViewPlayer}
          />
        ))}
      </div>
    </div>
  );
}
