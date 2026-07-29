import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import { ClubDetailResponse } from "@/types/club";
import ClubSummary from "@/components/clubs/summary/ClubSummary";

interface Props {
  title: string;
  club: ClubDetailResponse;
  content: React.ReactNode;
}

const ClubDetailPageLayout = ({ title, club, content }: Props) => {
  const summary = <ClubSummary summary={club} />;

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default ClubDetailPageLayout;
