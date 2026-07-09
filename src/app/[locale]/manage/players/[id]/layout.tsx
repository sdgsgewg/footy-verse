"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

export default function ViewPlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
