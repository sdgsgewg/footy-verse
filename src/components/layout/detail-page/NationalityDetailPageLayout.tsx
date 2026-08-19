import React from "react";
import DetailPageLayout from "./DetailPageLayout";

interface Props {
  title: string;
  summary: React.ReactNode;
  content: React.ReactNode;
  returnTo?: string;
}

const NationalityDetailPageLayout = ({
  title,
  summary,
  content,
  returnTo,
}: Props) => {
  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      returnTo={returnTo}
    />
  );
};

export default NationalityDetailPageLayout;
