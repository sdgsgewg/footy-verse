import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import React from "react";

export default function CompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
