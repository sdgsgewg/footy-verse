"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

export default function CreatePlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
