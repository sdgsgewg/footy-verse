import React from "react";

const ManagePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto py-8 lg:py-12 px-4">{children}</div>;
};

export default ManagePageLayout;
