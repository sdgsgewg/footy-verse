"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

export default function NationalityManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
