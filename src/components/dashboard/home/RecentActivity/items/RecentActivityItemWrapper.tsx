import React from "react";

export default function RecentActivityItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`space-y-5`}>{children}</div>;
}
