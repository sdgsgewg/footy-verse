"use client";

import ManagePageLayout from "@/components/layout/ManagePageLayout";

interface Props {
  children: React.ReactNode;
}

export default function CreatePlayerLayout({ children }: Props) {
  return <ManagePageLayout>{children}</ManagePageLayout>;
}
