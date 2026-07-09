import { Player } from "@/interface/Player";
import PlayerCard from "./PlayerCard";

export default function PlayerSection({
  title,
  teamType,
  teamName,
  players,
  playerType,
}: {
  title: string;
  teamType: string;
  teamName: string;
  players: Player[];
  playerType: string;
}) {
  if (players.length === 0) return null; // Tidak tampilkan jika kosong

  return (
    <div className="flex flex-col px-4">
      <div className="w-full flex justify-center items-center mb-8">
        <h1 className="text-4xl text-dark font-bold uppercase">{title}</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center mb-20 xl:w-10/12 xl:mx-auto">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            teamType={teamType}
            teamName={teamName}
            player={player}
            playerType={playerType}
          />
        ))}
      </div>
    </div>
  );
}
