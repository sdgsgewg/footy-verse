import { PlayerListItem } from "@/types/player";
import { TeamType } from "@/types/team";
import Image from "next/image";

interface Props {
  teamType: TeamType;
  player: PlayerListItem;
  onNavigate: (player: PlayerListItem) => void;
}

export default function PlayerCard({ teamType, player, onNavigate }: Props) {
  const {
    imageUrl,
    name,
    shirtNumber,
    mainPosition,
    currentNationalTeam,
    currentClubTeam,
  } = player;

  const [firstName, lastName] = name.split(" ");

  const position = mainPosition?.name;

  const isClubPlayer = teamType === "club";

  const modifiedShirtNumber = isClubPlayer
    ? shirtNumber.club
    : shirtNumber.nationalTeam;

  const playerOrigin = isClubPlayer ? currentNationalTeam : currentClubTeam;

  return (
    <div
      className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 cursor-pointer"
      onClick={() => onNavigate(player)}
    >
      <div className="flex flex-col p-4">
        <div
          className="rounded-t-md shadow-md flex justify-center overflow-hidden"
          style={{ width: "100%", height: "250px" }}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={250}
            className="object-cover hover:scale-110 transition-transform"
          />
        </div>

        <div className="bg-card p-4 rounded-b-md shadow-md">
          <div className="flex flex-row justify-between mb-2">
            <div className="flex flex-col">
              <p
                className={`font-semibold ${
                  firstName === lastName ? "text-primary" : "text-secondary"
                } text-large uppercase`}
              >
                {firstName}
              </p>
              <p className="font-bold text-primary text-xl uppercase">
                {lastName}
              </p>
            </div>
            <p className="text-primary text-5xl font-bold">
              {modifiedShirtNumber}
            </p>
          </div>

          <div className="flex items-center font-semibold text-base text-tertiary">
            <h5>{position}</h5>
          </div>

          {playerOrigin && (
            <div className="flex items-center font-semibold text-sm text-tertiary gap-2 mt-2">
              <Image
                src={playerOrigin.imageUrl}
                alt={playerOrigin.name}
                width={20}
                height={20}
                className={`${Array.isArray(origin) ? "w-6 h-4" : "w-4 h-4"}`}
              />
              <h5>{playerOrigin.name}</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
