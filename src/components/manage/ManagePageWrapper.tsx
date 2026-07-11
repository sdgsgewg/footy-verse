import React from "react";

interface Props {
  children: React.ReactNode;
}

const ManagePageWrapper = ({ children }: Props) => {
  return <div className="space-y-8">{children}</div>;
};

export default ManagePageWrapper;
