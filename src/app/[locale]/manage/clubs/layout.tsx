"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

export default function ClubManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
