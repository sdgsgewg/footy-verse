import React from "react";
import DetailPageLayout from "./DetailPageLayout";
import { NationalityDetailResponse } from "@/types/nationality";
import NationalitySummary from "@/components/nationalities/summary/NationalitySummary";

interface Props {
  title: string;
  nationality: NationalityDetailResponse;
  content: React.ReactNode;
}

const NationalityDetailPageLayout = ({
  title,
  nationality,
  content,
}: Props) => {
  const summary = <NationalitySummary summary={nationality} />;

  return <DetailPageLayout title={title} summary={summary} content={content} />;
};

export default NationalityDetailPageLayout;
