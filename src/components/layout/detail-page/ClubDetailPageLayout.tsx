import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import Image from "next/image";
import { ClubDetailResponse } from "@/types/club";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface Props {
  title: string;
  club: ClubDetailResponse;
  content: React.ReactNode;
}

const ClubDetailPageLayout = ({ title, club, content }: Props) => {
  const { imageUrl } = club;

  const summary = (
    <>
      <div className="w-32 h-48 flex overflow-hidden">
        <ImageWrapper
          src={imageUrl}
          alt={title}
          className={{
            image: "w-full object-contain",
          }}
          hoverOverlay
          clickable
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
