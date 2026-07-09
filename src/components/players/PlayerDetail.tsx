"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import playerData from "@/data/playerData";
import flagImages from "@/data/flagImages";
import clubImages from "@/data/clubImages";
import { Player as PlayerType } from "@/interface/Player";

const PlayerData = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-card grid grid-cols-3 items-start border-b-2 border-accent px-5 py-3">
      <p className="text-large font-semibold uppercase text-start">{`${label}:`}</p>

      {/* Kalau ada children, pakai children, kalau tidak pakai value biasa */}
      <div className="text-large font-medium col-span-2 text-start">
        {children ? children : value}
      </div>
    </div>
  );
};

const PlayerDetail = () => {
  const { teamType, teamName, playerType, slug } = useParams() as {
    teamType: string;
    teamName: string;
    playerType: string;
    slug: string;
  };
  const router = useRouter();

  const teamData = playerData[teamName as keyof typeof playerData];
  const players = teamData
    ? (teamData as Record<string, PlayerType[]>)[playerType]
    : undefined;
  const player = players?.find((p) => p.slug === slug);

  if (!player) {
    return (
      <div className="text-center pt-36 pb-16">
        <p>Player not found.</p>
      </div>
    );
  }

  const {
    image,
    name,
    dob,
    pob,
    positions,
    preferredFoot,
    squadNumber,
    height,
    weight,
    nationalities,
    marketValue,
  } = player;

  const calculateAge = () => {
    const birthDate = new Date(dob); // Mengubah string jadi objek Date
    const today = new Date(); // Tanggal saat ini

    let age = today.getFullYear() - birthDate.getFullYear(); // Hitung selisih tahun

    // Cek apakah ulang tahun sudah lewat dalam tahun ini
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age -= 1; // Kurangi umur jika ulang tahun belum lewat
    }

    return age;
  };

  // Positions
  const mainPosition = positions[0];
  const otherPositions = positions.slice(1);

  // Market Value
  const modifiedMarketValue =
    player.marketValue >= 1
      ? `€${marketValue.toFixed(2)}m` // Jutaan (€1.80m)
      : `€${(marketValue * 1000).toFixed(0)}k`; // Ribuan (€300k)

  return (
    <div className="pt-36 pb-16">
      <div className="w-full">
        {/* Player Name and Image */}
        <div className="max-w-xl mx-auto text-center mb-8">
          <h1 className="text-5xl text-primary font-bold uppercase">{name}</h1>

          <div
            className="flex justify-center overflow-hidden my-8"
            style={{ width: "100%", height: "350px" }}
          >
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Player Profile */}
        <div className="max-w-xl mx-auto text-center mb-8">
          <div className="bg-primary text-primary-foreground text-2xl font-bold px-5 py-3 uppercase mb-2">
            <p className="text-start">Player Profile</p>
          </div>

          <PlayerData label="Name" value={name} />
          <PlayerData label="Squad Number" value={squadNumber} />

          {/* Position */}
          <div className="bg-card grid grid-cols-3 border-b-2 border-accent px-5 py-3">
            <p className="text-large font-bold uppercase text-start">
              Position:
            </p>
            {/* Main Position */}
            <div className="flex flex-col items-start text-large font-medium col-span-1 text-start">
              <p>Main Position:</p>
              <p>{mainPosition}</p>
            </div>

            {/* Other Positions */}
            {otherPositions.length > 0 && (
              <div className="flex flex-col text-large font-medium col-span-1 text-start">
                <p>Other Position:</p>
                {otherPositions.map((position: string) => (
                  <p key={position}>{position}</p>
                ))}
              </div>
            )}
          </div>

          <PlayerData
            label="Date of Birth"
            value={dob + " (" + calculateAge() + ")"}
          />
          <PlayerData label="Place of Birth" value={pob} />
          <PlayerData label="Height" value={`${height} m`} />
          <PlayerData label="Weight" value={`${weight} kg`} />
          <PlayerData label="Preferred Foot" value={`${preferredFoot}`} />

          {/* Nationality */}
          <PlayerData label="Nationality">
            <div className="flex flex-col gap-1">
              {nationalities.map((nationality: string) => (
                <div
                  key={nationality}
                  className="flex flex-row items-center gap-2"
                >
                  <Image
                    src={
                      flagImages[
                        nationality.replaceAll(
                          " ",
                          "",
                        ) as keyof typeof flagImages
                      ] || "/assets/img/flags/default.png"
                    }
                    alt={nationality}
                    width={24}
                    height={16}
                    className="w-6 h-4"
                  />
                  <p>{nationality}</p>
                </div>
              ))}
            </div>
          </PlayerData>

          {/* Club */}
          {teamType === "nation" && (
            <PlayerData label="Club">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={
                    clubImages[
                      player.club
                        ?.replaceAll(" ", "")
                        .replaceAll("'", "") as keyof typeof clubImages
                    ] || "/assets/img/flags/default.png"
                  }
                  alt={player.club ?? "-"}
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                <p>{player.club}</p>
              </div>
            </PlayerData>
          )}

          <PlayerData label="Market Value" value={`${modifiedMarketValue}`} />
        </div>

        {/* Back to Players Page */}
        <div className="max-w-xl mx-auto flex items-center justify-center ">
          <button
            className="bg-primary text-primary-foreground px-8 py-2 rounded-xl hover:bg-primary/80 cursor-pointer"
            onClick={() =>
              router.push(`/${teamType}/${teamName}/${playerType}/players`)
            }
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
