import React from "react";
import DetailPageLayout from "./DetailPageLayout";

interface Props {
  title: string;
  summary: React.ReactNode;
  content: React.ReactNode;
  backHref?: string;
}

const ClubDetailPageLayout = ({ title, summary, content, backHref }: Props) => {
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
