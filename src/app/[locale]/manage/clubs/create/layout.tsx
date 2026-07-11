"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

interface Props {
  children: React.ReactNode;
}

export default function CreateClubLayout({ children }: Props) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
