import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import Image from "next/image";
import { PlayerDetailResponse } from "@/types/player";
import PlayerProfile from "@/components/players/sections/PlayerProfile";
import PlayerHistory from "@/components/players/sections/PlayerHistory";

interface Props {
  title: string;
  imageUrl: string;
  player: PlayerDetailResponse;
}

const PlayerDetailPageLayout = ({ title, imageUrl, player }: Props) => {
  const { summary: PlayerSummaryData } = player;
  const { name } = PlayerSummaryData;

  const summary = (
    <>
      <div
        className="flex overflow-hidden"
        // style={{ width: "100%", height: "350px" }}
      >
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
          width={180}
          height={180}
        />
      </div>

      <div className="flex-1">
        <p>{name}</p>
      </div>
    </>
  );

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PlayerProfile player={player} />
      <PlayerHistory player={player} />
    </div>
  );

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default PlayerDetailPageLayout;
