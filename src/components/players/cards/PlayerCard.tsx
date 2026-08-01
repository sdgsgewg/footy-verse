import ImageWrapper from "@/components/shared/ImageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { TeamType } from "@/enums/TeamType";
import { PlayerListItem } from "@/types/player";
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
    currentNationality,
    currentClubTeam,
  } = player;

  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names.slice(1).join(" ") || names[0];

  const isClubPlayer = teamType === TeamType.CLUB;

  const modifiedShirtNumber = isClubPlayer
    ? shirtNumber.club
    : shirtNumber.nationalTeam;

  const playerOrigin = isClubPlayer ? currentNationality : currentClubTeam;

  return (
    <Card
      onClick={() => onNavigate(player)}
      className="group flex h-90 flex-col py-0 gap-0 cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <ImageWrapper
        src={imageUrl}
        alt={name}
        aspectRatio="none"
        hoverOverlay
        className={{
          container: "h-52 shrink-0 rounded-none",
          image:
            "object-cover transition-transform duration-500 group-hover:scale-105",
          overlay: "bg-black/0 group-hover:bg-black/10",
        }}
      />

      <CardContent className="min-h-0 flex-1 flex flex-col space-y-4 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={`text-lg font-semibold uppercase ${
                firstName === lastName
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {firstName}
            </p>

            <p className="text-2xl font-bold uppercase text-primary">
              {lastName}
            </p>
          </div>

          {modifiedShirtNumber && (
            <span className="text-5xl font-bold leading-none text-primary">
              {modifiedShirtNumber}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {mainPosition.name}
          </p>

          {playerOrigin && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src={playerOrigin.imageUrl}
                alt={playerOrigin.name}
                width={20}
                height={20}
                className={
                  isClubPlayer
                    ? "h-4 w-6 object-cover rounded-sm"
                    : "h-5 w-5 object-contain"
                }
              />

              <span>{playerOrigin.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
