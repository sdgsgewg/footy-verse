import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import React from "react";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
