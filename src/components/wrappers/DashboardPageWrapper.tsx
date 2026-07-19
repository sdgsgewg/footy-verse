import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardPageWrapper = ({ children }: Props) => {
  return <div className="space-y-6">{children}</div>;
};

export default DashboardPageWrapper;
