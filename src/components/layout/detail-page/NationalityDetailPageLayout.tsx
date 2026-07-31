import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import { NationalityDetailResponse } from "@/types/nationality";
import NationalitySummary from "@/components/nationalities/summary/NationalitySummary";

interface Props {
  title: string;
  nationality: NationalityDetailResponse;
  content: React.ReactNode;
  backHref?: string;
}

const NationalityDetailPageLayout = ({
  title,
  nationality,
  content,
  backHref,
}: Props) => {
  const summary = <NationalitySummary summary={nationality} />;

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
