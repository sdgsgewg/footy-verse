import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import Image from "next/image";
import { ClubDetailResponse } from "@/types/club";

interface Props {
  title: string;
  imageUrl: string;
  club: ClubDetailResponse;
}

const ClubDetailPageLayout = ({ title, imageUrl, club }: Props) => {
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

  const content = (
    <div className="space-y-6">
      <h1>Squad List</h1>
    </div>
  );

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default ClubDetailPageLayout;
