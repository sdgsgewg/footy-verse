import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import React from "react";

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
