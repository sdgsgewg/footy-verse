"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

export default function SeasonManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
