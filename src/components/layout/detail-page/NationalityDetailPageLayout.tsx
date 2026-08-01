import React from "react";
import DetailPageLayout from "./DetailPageLayout";

interface Props {
  title: string;
  summary: React.ReactNode;
  content: React.ReactNode;
  backHref?: string;
}

const NationalityDetailPageLayout = ({
  title,
  summary,
  content,
  backHref,
}: Props) => {
  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      backHref={backHref}
    />
  );
};

export default NationalityDetailPageLayout;
