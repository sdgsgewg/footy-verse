import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import { ClubDetailResponse } from "@/types/club";
import ClubSummary from "@/components/clubs/summary/ClubSummary";

interface Props {
  title: string;
  club: ClubDetailResponse;
  content: React.ReactNode;
  backHref?: string;
}

const ClubDetailPageLayout = ({ title, club, content, backHref }: Props) => {
  const summary = <ClubSummary summary={club} />;

  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      backHref={backHref}
    />
  );
};

export default ClubDetailPageLayout;
