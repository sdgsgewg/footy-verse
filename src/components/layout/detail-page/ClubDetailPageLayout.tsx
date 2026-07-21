import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import Image from "next/image";
import { ClubDetailResponse } from "@/types/club";

interface Props {
  title: string;
  club: ClubDetailResponse;
  content: React.ReactNode;
}

const ClubDetailPageLayout = ({ title, club, content }: Props) => {
  const { imageUrl } = club;

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
        <p>{club.name}</p>
      </div>
    </>
  );

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default ClubDetailPageLayout;
