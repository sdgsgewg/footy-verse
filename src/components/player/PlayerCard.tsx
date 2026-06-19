import flagImages from "../../data/flagImages";
import clubImages from "../../data/clubImages";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Player } from "@/interface/Player";

export default function PlayerCard({
  teamType,
  teamName,
  player,
  playerType,
}: {
  teamType: string;
  teamName: string;
  player: Player;
  playerType: string;
}) {
  const router = useRouter();

  const origin = teamType === "nation" ? player?.club : player?.nationalities;

  let playerOrigin = "";
  let flagUrl = "/assets/img/flags/default.png";

  if (Array.isArray(origin)) {
    playerOrigin = origin[0] || "";
    flagUrl =
      flagImages[
        playerOrigin?.replaceAll(" ", "") as keyof typeof flagImages
      ] || "/assets/img/flags/default.png";
  } else if (origin) {
    playerOrigin = origin;
    flagUrl =
      clubImages[
        playerOrigin
          ?.replaceAll(" ", "")
          ?.replaceAll("'", "") as keyof typeof clubImages
      ] || "/assets/img/flags/default.png";
  }

  const { image, name, firstName, lastName, slug, positions, squadNumber } =
    player;

  return (
    <div
      className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 cursor-pointer"
      onClick={() =>
        router.push(`/${teamType}/${teamName}/${playerType}/players/${slug}`)
      }
    >
      <div className="flex flex-col p-4">
        <div
          className="rounded-t-md shadow-md flex justify-center overflow-hidden"
          style={{ width: "100%", height: "250px" }}
        >
          <Image
            src={image}
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
            <p className="text-primary text-5xl font-bold">{squadNumber}</p>
          </div>

          <div className="flex items-center font-semibold text-base text-tertiary">
            <h5>{positions[0]}</h5>
          </div>

          <div className="flex items-center font-semibold text-sm text-tertiary gap-2 mt-2">
            <Image
              src={flagUrl}
              alt={playerOrigin}
              width={20}
              height={20}
              className={`${Array.isArray(origin) ? "w-6 h-4" : "w-4 h-4"}`}
            />
            <h5>{playerOrigin}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
